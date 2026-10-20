import { MyCashKick } from '@/api/cashkicks/cashkicks.types';
import { MyContract } from '@/api/contracts/contracts.types';

export interface CashAccelerationOutletContext {
  refetchCount: number;
  onSyncComplete: () => void;
}

export interface CashAccelerationSectionProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentPage: number;
  handlePageChange: (page: number) => void;
  contracts: MyContract[];
  myCashKick: MyCashKick[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  totalPages: number;
  handleLaunchCashKick: () => void;
}
