import { Payment } from '@/api/payments/payments.types';

export interface YourPaymentsProps {
  payments: Payment[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  loading: boolean;
  error: boolean;
  totalPages: number;
  onRetry: () => void;
  handleLaunchCashKick: () => void;
}
