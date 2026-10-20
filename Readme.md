# Readme.md

This file provides guidance to devs when working with code in this repository.

## Commands

All commands run from this directory (`seeder/`), using yarn.

- `yarn start` — dev server via webpack-dev-server on port 3000
- `yarn build` — production build via webpack (output to `dist/`)
- `yarn lint` / `yarn lint:fix` — ESLint over `src`
- `yarn format` — Prettier write over the whole repo
- `yarn test` — run Jest test suite once
- `yarn test:watch` — Jest in watch mode
- `yarn test:cov` — Jest with coverage (writes to `coverage/`, used by CI/Sonar)
- Run a single test file: `yarn test src/components/molecules/NavTabs/NavTabs.test.tsx`
- Run tests matching a name: `yarn test -t "renders the tab label"`
- `yarn storybook` — Storybook dev server on port 6006
- `yarn build-storybook` — static Storybook build
- Mock API servers (json-server on port 9999, swap dataset as needed): `yarn mock:seeded`, `yarn mock:unfunded`, `yarn mock:emptydata`

Test files use `*.test.tsx` / `*.test.ts` (or `.spec.*`) colocated next to the component they cover. Most components currently lack tests — `NavTabs.test.tsx` is the reference example for the expected pattern (render with `ThemeProvider`, query by role/a11y attributes).

## Architecture

React 19 + TypeScript SPA bundled with webpack (not CRA/Vite, despite `REACT_APP_`-prefixed env vars and a stray `vite-env.d.ts`). Routing via `react-router-dom` v7, UI via MUI v9 with a fully custom theme/palette (no default MUI colors), styling via `@emotion/styled` + MUI's `sx` prop.

**Path alias**: `@/*` maps to `src/*` everywhere (webpack, tsconfig, jest, storybook). ESLint's `no-restricted-imports` rule **forbids relative imports** (`./` and `../`) — always import via `@/...` even for sibling files.

### Component layering (atomic design)

`src/components/` is strictly layered:

- `atoms/` — smallest primitives (Button, Input, Checkbox, Badge, Tag, Skeleton, TableCellValue, TableHeaderItem, TableRowCell, Icon, Typography, Avatar, Sparkline, ProgressBar, Divider)
- `molecules/` — composed from atoms (NavTabs, NavItem, Tabs, TableRow, TableHeader, CashKickCard, CongratulationsCard, SummaryMetadata, Greeting, AvatarSection, AutoSelectSection, CircularProgress, EmptyState, MetricSkeleton, CardSkeleton, TableSkeletonRows, Logo)
- `organisms/` — larger composed units (DataTable, Sidebar, Dialog, Pagination, SummaryCard, TitleBar, CashAccelerationCard, DashboardInfoCard)
- `templates/` — page shells (`MainTemplate` — the app's sidebar + outlet layout)

Every component folder follows the same file split: `ComponentName.tsx` (component), `ComponentName.types.ts` (props interface), `ComponentName.styles.ts` (styled/sx helpers, usually a `getXStyles(theme, ...)` function), `ComponentName.stories.tsx` (Storybook), `index.ts` (re-exports default + types). Match this structure exactly when adding a new component — don't collapse styles or types into the component file. Note: a few existing folders have inconsistent naming (leading space in filename, e.g. `AutoSelectSection/ AutoSelectSection.types.ts`, `CardSkeleton/ index.ts`) — don't propagate that pattern in new code.

`TableCellValue` (atoms) is a variant-dispatch component: it picks a sub-component from a `variantMap` keyed by a `variant` prop (`text`, `text-subtitle`, `text-icon`, `tag`, `progress`, etc.) and renders it with the passed props. Several variants (`progress`, `progress-percentage`, `icon`, `sparkline`) are still stubbed to return `null` — check this map before assuming a variant is implemented.

### Pages and routing

`src/App.tsx` defines all routes against constants in `src/routes/paths.ts` (`ROUTES`). Everything nests under `MainTemplate` (sidebar layout with `<Outlet />`). Three top-level route trees:

- `/home` — `HomePage`
- `/cash-acceleration` — `CashAccelerationPage`, with nested tabs `contracts` (`MyContracts`) and `cash-kicks` (`MyCashKicks`)
- `/new-cash-kick` — `NewCashKickPage`, a multi-step flow with nested `select` (`SelectContracts`) and `review` (`ReviewContracts`) steps

Each page lives in `src/pages/<PageName>/` with its own `components/` subfolder for page-local components (not promoted to `src/components/` unless reused elsewhere) and often a local `utils.ts` for page-specific formatting/derivation logic.

Cross-step state for the `NewCashKick` flow (selected contracts) is shared via `CashKickContext` (`src/pages/NewCashKick/context/CashKickContext.tsx`), a plain `createContext` — no reducer/state library involved.

### API layer

`src/api/` is organized one subfolder per resource (`cashkicks`, `contracts`, `funding`, `payments`, `cashAcceleration`), each with `<resource>.api.ts` (functions) and `<resource>.types.ts` (DTOs). All requests go through `src/api/client.ts`'s `http` wrapper (`http.get/post/put/patch/delete<T>`), which wraps a shared `axios` instance (`apiClient`) and unwraps `res.data` so call sites stay fully typed and don't repeat `.then((res) => res.data)`. Endpoint path constants live in `src/api/endpoints.ts` (`ENDPOINTS`). Shared response shapes (e.g. `PaginatedResponse<T>`) live in `src/api/types.ts`.

Data fetching from components goes through the `useApi` hook (`src/hooks/useApi.ts`): pass an `(signal) => Promise<T>` function plus a dependency array; it manages `{ data, loading, error }` state, aborts in-flight requests on unmount/dep change via `AbortController`, and exposes `refetch()`.

**Known issue in `src/api/client.ts`**: `apiClient`'s `baseURL` is hardcoded to `http://localhost:9999` rather than using `process.env.REACT_APP_API_URL` (which is read only for a `console.log`) — the `.env` value (`http://localhost:9999`, matching the mock servers) is currently not actually wired up. There is also a temporary 1500ms artificial delay added to every request via an interceptor (marked `TEMP ... REMOVE BEFORE PUSHING`) for loader/skeleton testing — be aware it's there but don't assume it's meant to stay long-term.

### Theming

`src/theme/` defines a custom MUI theme (`theme/index.ts` composes `typography.ts` + `palette.ts`). The palette replaces MUI's default color keys with domain-specific groups (`brand`, `text`, `border`, `icon`, `surface`, `grey`) — augmented via `theme.d.ts`. Components should style through `theme.palette.<group>.<token>` (see `Button.styles.ts`'s `getButtonStyles(theme, variant, size)` pattern), not hardcoded colors or MUI's default palette keys.

## Linting/formatting notes

- Prettier config: single quotes, semicolons, 100-char print width, 2-space tabs — run `yarn format` rather than hand-formatting.
- `sonarjs/cognitive-complexity` is enabled (as a warning) — keep functions simple, this project is scanned by SonarQube in CI (`.gitlab-ci.yml` runs `sonarqube-check` on MRs and main/master/develop).
