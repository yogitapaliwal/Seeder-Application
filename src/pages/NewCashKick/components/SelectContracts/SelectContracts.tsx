import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { useApi } from '@/hooks/useApi';
import { ContractsSection, PageContent } from '@/pages/NewCashKick/NewCashKick.styles';
import YourContracts from '@/pages/NewCashKick/components/YourContracts/YourContracts';
import SummaryCard from '@/components/organisms/SummaryCard';
import AutoSelectSection from '@/components/molecules/AutoSelectSection';
import Slider from '@/components/atoms/Slider';
import Icon from '@/components/atoms/Icon/Icon';
import Button from '@/components/atoms/Button';
import { ROUTES } from '@/routes/paths';
import { CashKickContext } from '@/pages/NewCashKick/context/CashKickContext';
import { contractsApi } from '@/api/contracts/contracts.api';
import { cashAccelerationApi } from '@/api/cashAcceleration/cashAcceleration.api';
import { formatCurrency } from '@/utils/currencyformatter';
import { MyContract } from '@/api/contracts/contracts.types';
import { getInfoTooltipIconStyles } from '@/pages/NewCashKick/components/SelectContracts/SelectContracts.styles';

const SelectContracts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedTotal, setSelectedTotal] = useState<number>(0);
  const [autoSelecting, setAutoSelecting] = useState<boolean>(false);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  // Whether the current selection is exactly the result of the last
  // select-all click - drives the header checkbox's checked state and its
  // click-to-clear toggle. Can't be derived from selectedRows.length===items:
  // under a budget cap, select-all can never select every contract in the
  // dataset, so that comparison would never be true and the checkbox would
  // never register as "checked" (repeated clicks would silently re-run the
  // same select-all instead of clearing).
  const [isSelectAllApplied, setIsSelectAllApplied] = useState<boolean>(false);
  // Local, instantly-updating slider position - decoupled from selectedTotal
  // (which only updates once the autoSelect API call resolves) so dragging
  // the thumb never waits on a network round-trip. Synced back to the real
  // selection percentage whenever selection changes through another path
  // (select-all, manual row toggle, reset).
  const [sliderPercent, setSliderPercent] = useState<number>(0);
  // Guards against an older in-flight autoSelect response overwriting a
  // newer one - e.g. dragging the slider to a new position, or clicking
  // select-all, before the previous request has resolved.
  const latestAutoSelectRequest = useRef(0);

  const {
    data: contractsData,
    loading: contractsLoading,
    error: contractsError,
    refetch: refetchContracts,
  } = useApi(
    (signal) =>
      contractsApi.getAll(currentPage, DEFAULT_PAGE_SIZE, undefined, { signal }, selectedRows),
    // Intentionally excludes `selectedRows` - only page changes should trigger
    // a refetch here. Reordering the page every time a single checkbox is
    // clicked would make rows jump position under the user's cursor mid-click.
    // Bulk selection changes (select-all, slider commit, reset) explicitly
    // call refetchContracts() below once the new selection is known, so the
    // page still re-sorts after those actions - just not on every manual toggle.
    [currentPage],
  );

  const {
    data: cashAcceleration,
    loading: cashAccelerationLoading,
    error: cashAccelerationError,
  } = useApi((signal) => cashAccelerationApi.get({ signal }), []);

  const { setSelectedContracts } = useContext(CashKickContext);
  const navigate = useNavigate();

  const { data: contracts = [], pages: contractsTotalPages = 1 } = contractsData ?? {};
  const { termCapMonths = 0, availableCredit = 0, maxInterestRate = 0 } = cashAcceleration ?? {};
  const isAnyRowSelected = !!selectedRows.length;
  const isLoading = contractsLoading || cashAccelerationLoading;
  const hasError = contractsError ?? cashAccelerationError;

  const feeAmount = useMemo(
    () => selectedTotal * (maxInterestRate / 100),
    [selectedTotal, maxInterestRate],
  );

  const payBackAmount = useMemo(() => selectedTotal + feeAmount, [selectedTotal, feeAmount]);

  const totalPayout = useMemo(() => selectedTotal - feeAmount, [selectedTotal, feeAmount]);

  const selectedPercent = useMemo(
    () => (availableCredit > 0 ? Math.round((selectedTotal / availableCredit) * 100) : 0),
    [selectedTotal, availableCredit],
  );

  const remainingCredit = useMemo(
    () => availableCredit - selectedTotal,
    [availableCredit, selectedTotal],
  );

  const isOverLimit = selectedTotal > availableCredit;
  const someSelected = isAnyRowSelected && !isSelectAllApplied;

  // Keeps the slider's visual position in sync when selection changes
  // through anything other than dragging it (select-all, a manual row
  // toggle, reset) - dragging itself updates sliderPercent directly and
  // doesn't need to wait for this.
  useEffect(() => {
    setSliderPercent(selectedPercent);
  }, [selectedPercent]);

  // True while the thumb has been moved away from the last committed
  // position and the release hasn't landed yet - the only window where the
  // displayed amount needs to be an estimate rather than the real total.
  const isDraggingSlider = sliderPercent !== selectedPercent;

  // A live, purely local estimate of what the slider position corresponds
  // to in dollars - lets the user see roughly where they're aiming while
  // dragging, without waiting on the autoSelect API call. This can differ
  // slightly from the actual amount that gets selected on release, since
  // the real selection is built from whole contracts (not an arbitrary
  // fraction of the budget), so it's shown with a "~" while dragging.
  const estimatedDraggedAmount = (sliderPercent / 100) * availableCredit;
  const displayedSelectedAmount = isDraggingSlider
    ? `~${formatCurrency(estimatedDraggedAmount)}`
    : formatCurrency(selectedTotal);
  const displayedRemainingAmount = isDraggingSlider
    ? availableCredit - estimatedDraggedAmount
    : remainingCredit;

  const handleSelectAll = async () => {
    if (isSelectAllApplied) {
      setSelectedRows([]);
      setSelectedTotal(0);
      setIsSelectAllApplied(false);
      refetchContracts();
      return;
    }

    const requestId = ++latestAutoSelectRequest.current;
    try {
      setAutoSelecting(true);
      const { selectedIds, totalAmount } = await contractsApi.autoSelect(availableCredit);
      if (requestId !== latestAutoSelectRequest.current) return; // a newer request already landed
      setSelectedRows(selectedIds);
      setSelectedTotal(totalAmount);
      setIsSelectAllApplied(true);
      refetchContracts();
    } catch (error) {
      console.error('Failed to select all contracts:', error);
    } finally {
      if (requestId === latestAutoSelectRequest.current) setAutoSelecting(false);
    }
  };

  const handleRowSelection = (id: string) => {
    const isCurrentlySelected = selectedRows.includes(id);
    const contract = contracts.find((c: MyContract) => c.id === id);
    if (!contract) return;

    // A manual toggle always diverges from the select-all result, even if it
    // happens to reselect every id select-all had chosen.
    setIsSelectAllApplied(false);

    if (isCurrentlySelected) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setSelectedTotal((prev) => prev - contract.paymentAmount);
      return;
    }

    const wouldExceedLimit = selectedTotal + contract.paymentAmount > availableCredit;
    if (wouldExceedLimit) {
      return;
    }

    setSelectedRows([...selectedRows, id]);
    setSelectedTotal((prev) => prev + contract.paymentAmount);
  };

  // Fires only once the user releases the slider (onChangeCommitted), not on
  // every drag tick - dragging itself is handled locally via setSliderPercent
  // so the thumb moves instantly without waiting on this network call.
  const handleAutoselectCommit = async (percent: number) => {
    const targetAmount = (percent / 100) * availableCredit;
    const requestId = ++latestAutoSelectRequest.current;
    try {
      setAutoSelecting(true);
      const { selectedIds, totalAmount } = await contractsApi.autoSelect(targetAmount);
      if (requestId !== latestAutoSelectRequest.current) return; // a newer request already landed
      setSelectedRows(selectedIds);
      setSelectedTotal(totalAmount);
      setIsSelectAllApplied(false);
      refetchContracts();
    } catch (error) {
      console.error('Failed to autoselect contracts:', error);
    } finally {
      if (requestId === latestAutoSelectRequest.current) setAutoSelecting(false);
    }
  };

  const handleReset = () => {
    setSelectedRows([]);
    setSelectedTotal(0);
    setIsSelectAllApplied(false);
    refetchContracts();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReviewClick = async () => {
    setReviewLoading(true);
    try {
      const fullContracts = await contractsApi.getByIds(selectedRows);
      setSelectedContracts(fullContracts);
      navigate(ROUTES.NEW_CASH_KICK_REVIEW);
    } catch (error) {
      console.error('Failed to load selected contracts:', error);
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <PageContent>
      <ContractsSection>
        <YourContracts
          contracts={contracts}
          selectedRows={selectedRows}
          allSelected={isSelectAllApplied}
          someSelected={someSelected}
          remainingCredit={remainingCredit}
          currentPage={currentPage}
          loading={isLoading}
          error={!!hasError}
          onRetry={refetchContracts}
          totalPages={contractsTotalPages}
          handlePageChange={handlePageChange}
          handleSelectAll={handleSelectAll}
          handleSelectAllDisabled={autoSelecting}
          handleRowSelection={handleRowSelection}
        />
      </ContractsSection>

      <SummaryCard
        title="Summary"
        infoIcon={<Icon name="info-circle" />}
        topItems={[
          { id: 'term', label: 'Term', value: `${termCapMonths} months` },
          {
            id: 'selectedContracts',
            label: 'Selected contracts',
            value: String(selectedRows.length),
          },
        ]}
        autoSelect={
          <AutoSelectSection
            title="Slide to autoselect"
            isRemainingZero={
              isDraggingSlider ? estimatedDraggedAmount >= availableCredit : remainingCredit <= 0
            }
            infoTooltip={
              <Tooltip title="We select the combination of contracts that makes the most of your available credit - a contract may be skipped if a different combination fits your credit better.">
                <Box component="span" sx={getInfoTooltipIconStyles()}>
                  <Icon name="info-circle" size={14} />
                </Box>
              </Tooltip>
            }
            slider={
              <Slider
                value={sliderPercent}
                min={0}
                max={100}
                onChange={(_, value) => setSliderPercent(value as number)}
                onChangeCommitted={(_, value) => handleAutoselectCommit(value as number)}
              />
            }
            selectedAmount={displayedSelectedAmount}
            totalAmount={formatCurrency(availableCredit)}
            remainingAmount={contractsLoading ? '' : formatCurrency(displayedRemainingAmount)}
            onReset={handleReset}
            isResetBtnDisabled={!selectedTotal}
          />
        }
        bottomItems={[
          { id: 'payback', label: 'Pay back amount', value: formatCurrency(payBackAmount) },
          {
            id: 'rate',
            label: 'Rate %',
            value: formatCurrency(feeAmount),
            secondaryValue: `(${maxInterestRate.toFixed(2)}%)`,
          },
        ]}
        total={{
          label: 'Total Payout',
          value: formatCurrency(totalPayout),
        }}
        footer={
          <Button
            variant="primary"
            fullWidth
            disabled={!isAnyRowSelected || isOverLimit || reviewLoading}
            onClick={handleReviewClick}
          >
            {reviewLoading ? 'Loading...' : 'Review Your Credit'}
          </Button>
        }
      />
    </PageContent>
  );
};

export default SelectContracts;
