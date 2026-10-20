import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import MyCashKickTable from '@/pages/CashAcceleration/components/MyCashKickTable/MyCashKickTable';
import Pagination from '@/components/molecules/Pagination/Pagination';
import { PaginationContainer } from '@/pages/NewCashKick/components/YourContracts/YourContracts.styles';
import { useApi } from '@/hooks/useApi';
import { cashKicksApi } from '@/api/cashkicks/cashkicks.api';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { ROUTES } from '@/routes/paths';
import { CashAccelerationOutletContext } from '@/pages/CashAcceleration/components/CashAccelerationSection/CashAccelerationSection.types';

const MyCashKicks = () => {
  const [cashKicksPage, setCashKicksPage] = useState<number>(1);
  const navigate = useNavigate();
  const { refetchCount, onSyncComplete } = useOutletContext<CashAccelerationOutletContext>();

  const {
    data: cashKicksData,
    loading: cashKicksLoading,
    error: cashKicksError,
    refetch: refetchCashKicks,
  } = useApi(
    (signal) => cashKicksApi.getAll(cashKicksPage, DEFAULT_PAGE_SIZE, undefined, { signal }),
    [cashKicksPage, refetchCount],
  );

  // Track whether the in-flight fetch was caused by a "Sync Now" bump (refetchCount),
  // as opposed to pagination, so we only report completion back for sync-triggered loads.
  const prevRefetchCountRef = useRef<number>(refetchCount);
  const isSyncRefetchRef = useRef<boolean>(false);

  useEffect(() => {
    if (refetchCount !== prevRefetchCountRef.current) {
      prevRefetchCountRef.current = refetchCount;
      isSyncRefetchRef.current = true;
    }
  }, [refetchCount]);

  useEffect(() => {
    if (!cashKicksLoading && isSyncRefetchRef.current) {
      isSyncRefetchRef.current = false;
      onSyncComplete();
    }
  }, [cashKicksLoading, onSyncComplete]);

  const { data: myCashKick = [], pages: totalPages = 1 } = cashKicksData ?? {};

  const handleLaunchCashKick = () => {
    navigate(ROUTES.NEW_CASH_KICK);
  };

  return (
    <>
      <MyCashKickTable
        myCashKicks={myCashKick}
        error={!!cashKicksError}
        onRetry={refetchCashKicks}
        handleLaunchCashKick={handleLaunchCashKick}
        loading={cashKicksLoading}
      />

      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            currentPage={cashKicksPage}
            totalPages={totalPages}
            onPageChange={setCashKicksPage}
          />
        </PaginationContainer>
      )}
    </>
  );
};

export default MyCashKicks;
