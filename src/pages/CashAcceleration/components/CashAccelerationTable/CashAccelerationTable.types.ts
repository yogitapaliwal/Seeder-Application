import { MyContract } from '@/api/contracts/contracts.types';

export interface CashAccelerationTableProps {
  contracts: MyContract[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  handleLaunchCashKick: () => void;
}
