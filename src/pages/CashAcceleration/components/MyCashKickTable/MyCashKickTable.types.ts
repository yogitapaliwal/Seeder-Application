import { MyCashKick } from '@/api/cashkicks/cashkicks.types';
export interface MyCashKickTableProps {
  myCashKicks: MyCashKick[];
  loading: boolean;
  error?: boolean;
  onRetry?: () => void;
  handleLaunchCashKick: () => void;
}
