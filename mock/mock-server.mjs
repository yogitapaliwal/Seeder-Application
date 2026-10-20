import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';
import { json } from 'milliparsec';
import { createApp } from 'json-server/lib/app.js';
import { paginate } from 'json-server/lib/paginate.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { NormalizedAdapter } from 'json-server/lib/adapters/normalized-adapter.js';
import { Observer } from 'json-server/lib/adapters/observer.js';

const PORT = Number(process.env.PORT) || 9999;
const file = process.argv[2];

if (!file) {
  console.error('Usage: node mock/mock-server.js <db-file>');
  process.exit(1);
}

const adapter = new Observer(new NormalizedAdapter(new JSONFile(file)));
const db = new Low(adapter, {});
await db.read();

const restApp = createApp(db, { logger: false });

// Custom routes are registered on a separate outer app and mounted *before*
// the generated REST app, so they're matched first - json-server's own
// catch-all (`app.use('/:name', ...)`) prefix-matches every path, including
// nested ones like /contracts/auto-select, and would otherwise 404 them
// before a route added on the same app instance ever got a chance to run.
//
// cors()/json() are scoped to this one path rather than applied globally -
// restApp parses its own body/CORS internally, and running a second body
// parser over an already-consumed request stream hangs the request forever.
const app = new App();
app.use('/contracts/auto-select', cors());
app.use('/contracts/auto-select', json());
app.use('/contracts', cors());
app.use('/cashkicks', cors());

// Guards on the DP below: below these, a naive first-fit (walk contracts in
// order, skip ones that don't fit) leaves more budget unused than necessary,
// since it never looks back for a better-fitting combination. Beyond them,
// the O(n * budget) table gets too large/slow for a single request - fall
// back to first-fit rather than let one call block the event loop or blow up
// memory. MAX_BUDGET bounds memory (three typed arrays sized to the budget);
// MAX_DP_CELLS additionally bounds runtime as the number of contracts grows.
const MAX_BUDGET_FOR_DP = 5_000_000;
const MAX_DP_CELLS = 200_000_000;

/**
 * 0/1 knapsack: finds the combination of *whole* contracts (no partial
 * financing of a single contract) whose paymentAmounts sum as close as
 * possible to targetAmount without exceeding it. Whole-dollar amounts only -
 * every value is rounded before use since the DP indexes an array by sum.
 */
function knapsackFill(contracts, targetAmount) {
  const budget = Math.floor(targetAmount);
  const achievable = new Uint8Array(budget + 1);
  const fromSum = new Int32Array(budget + 1).fill(-1);
  const fromItem = new Int32Array(budget + 1).fill(-1);
  achievable[0] = 1;

  for (let i = 0; i < contracts.length; i++) {
    const amount = Math.round(contracts[i].paymentAmount);
    if (amount <= 0 || amount > budget) continue;

    // Walk sums downward so each contract is only ever used once.
    for (let sum = budget - amount; sum >= 0; sum--) {
      if (achievable[sum] && !achievable[sum + amount]) {
        achievable[sum + amount] = 1;
        fromSum[sum + amount] = sum;
        fromItem[sum + amount] = i;
      }
    }
  }

  let bestSum = 0;
  for (let sum = budget; sum >= 0; sum--) {
    if (achievable[sum]) {
      bestSum = sum;
      break;
    }
  }

  const selectedIds = [];
  for (let sum = bestSum; sum > 0; sum = fromSum[sum]) {
    selectedIds.push(contracts[fromItem[sum]].id);
  }
  selectedIds.reverse();

  return { selectedIds, totalAmount: bestSum };
}

/** Simple first-fit fallback for budgets too large to run the DP over. */
function firstFitFill(contracts, targetAmount) {
  const selectedIds = [];
  let totalAmount = 0;

  for (const contract of contracts) {
    if (totalAmount + contract.paymentAmount > targetAmount) continue;
    totalAmount += contract.paymentAmount;
    selectedIds.push(contract.id);
  }

  return { selectedIds, totalAmount };
}

/**
 * Runs the budget-constrained contract selection server-side, so the client
 * never has to fetch the full contracts table to compute select-all/autoselect.
 * Used for both select-all (targetAmount = full available credit) and the
 * autoselect slider (targetAmount = a percentage of it) - both want the best
 * whole-contract combination that fits under the same kind of budget cap.
 */
app.post('/contracts/auto-select', (req, res) => {
  const { targetAmount } = req.body ?? {};

  if (typeof targetAmount !== 'number' || !Number.isFinite(targetAmount) || targetAmount < 0) {
    res.status(400).json({ error: 'targetAmount must be a non-negative number' });
    return;
  }

  const contracts = db.data.contracts ?? [];
  const budget = Math.floor(targetAmount);
  const dpCells = budget * contracts.length;
  const canRunDp = budget > 0 && budget <= MAX_BUDGET_FOR_DP && dpCells <= MAX_DP_CELLS;

  const result = canRunDp
    ? knapsackFill(contracts, targetAmount)
    : firstFitFill(contracts, targetAmount);

  res.json(result);
});

/**
 * Selected contracts can be scattered across the entire dataset (the
 * knapsack fill picks the best combination irrespective of position), so
 * "selected first" only makes sense if the sort happens before pagination -
 * sorting each page client-side after the fact can't move a selected
 * contract from page 6 onto page 1. Only kicks in when the client sends
 * `selectedIds`; otherwise falls through to json-server's own handler via
 * next() so plain unsorted pagination keeps working unchanged.
 */
app.get('/contracts', (req, res, next) => {
  const selectedIdsParam = req.query['selectedIds'];
  if (!selectedIdsParam) {
    next?.();
    return;
  }

  const selectedIds = new Set(
    String(selectedIdsParam)
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean),
  );

  const { status } = req.query;
  const page = Number(req.query['_page']) || 1;
  const perPage = Number(req.query['_per_page']) || 10;

  let contracts = db.data.contracts ?? [];
  if (status) {
    contracts = contracts.filter((contract) => contract.status === status);
  }

  const selected = [];
  const unselected = [];
  for (const contract of contracts) {
    (selectedIds.has(contract.id) ? selected : unselected).push(contract);
  }

  res.json(paginate([...selected, ...unselected], page, perPage));
});

/**
 * Newly-created cash kicks carry a `createdAt` stamp; the seeded fixtures don't.
 * json-server's own `_sort` (via sort-on) ranks a missing field *above* any
 * defined one in descending order, which would put every legacy seed row
 * ahead of a cash kick created moments ago - the opposite of "latest on top".
 * Treating a missing createdAt as -Infinity instead means real creations
 * always sort above the seed data, while ties among seed rows keep their
 * original (already newest-first) array order via Array#sort's stability.
 */
app.get('/cashkicks', (req, res) => {
  const { status } = req.query;
  const page = Number(req.query['_page']) || 1;
  const perPage = Number(req.query['_per_page']) || 10;

  let cashkicks = db.data.cashkicks ?? [];
  if (status) {
    cashkicks = cashkicks.filter((cashkick) => cashkick.status === status);
  }

  const withTime = (cashkick) => (cashkick.createdAt ? Date.parse(cashkick.createdAt) : -Infinity);
  const sorted = [...cashkicks].sort((a, b) => withTime(b) - withTime(a));

  res.json(paginate(sorted, page, perPage));
});

app.use(restApp);

app.listen(PORT, () => {
  console.log(`Mock server (with /contracts/auto-select) running on http://localhost:${PORT}`);
  console.log(`Serving data from ${file}`);
});
