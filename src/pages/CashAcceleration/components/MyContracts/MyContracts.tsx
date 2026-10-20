import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CashAccelerationTable from '@/pages/CashAcceleration/components/CashAccelerationTable/CashAccelerationTable';
import Pagination from '@/components/molecules/Pagination/Pagination';
import { PaginationContainer } from '@/pages/NewCashKick/components/YourContracts/YourContracts.styles';
import { useApi } from '@/hooks/useApi';
import { contractsApi } from '@/api/contracts/contracts.api';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { ROUTES } from '@/routes/paths';
import { CashAccelerationOutletContext } from '@/pages/CashAcceleration/components/CashAccelerationSection/CashAccelerationSection.types';

const MyContracts = () => {
  const [contractsPage, setContractsPage] = useState<number>(1);
  const navigate = useNavigate();
  const { refetchCount, onSyncComplete } = useOutletContext<CashAccelerationOutletContext>();

  const {
    data: contractsData,
    loading: contractsLoading,
    error: contractsError,
    refetch: refetchContracts,
  } = useApi(
    (signal) => contractsApi.getAll(contractsPage, DEFAULT_PAGE_SIZE, undefined, { signal }),
    [contractsPage, refetchCount],
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
    if (!contractsLoading && isSyncRefetchRef.current) {
      isSyncRefetchRef.current = false;
      onSyncComplete();
    }
  }, [contractsLoading, onSyncComplete]);

  const { data: contracts = [], pages: totalPages = 1 } = contractsData ?? {};

  const handleLaunchCashKick = () => {
    navigate(ROUTES.NEW_CASH_KICK);
  };

  return (
    <>
      <CashAccelerationTable
        contracts={contracts}
        error={!!contractsError}
        onRetry={refetchContracts}
        handleLaunchCashKick={handleLaunchCashKick}
        loading={contractsLoading}
      />

      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            currentPage={contractsPage}
            totalPages={totalPages}
            onPageChange={setContractsPage}
          />
        </PaginationContainer>
      )}
    </>
  );
};

export default MyContracts;
