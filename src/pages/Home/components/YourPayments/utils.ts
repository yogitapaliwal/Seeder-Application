import { PaymentStatus } from '@/api/payments/payments.types';

const PAYMENTS_COLUMN_WIDTHS = [252.75, 252.75, 252.75, 252.75];

const getStatusVariant = (status: PaymentStatus): 'default' | 'important' => {
  switch (status) {
    case 'Pending':
      return 'important';
    case 'Paid':
    case 'Cancelled':
    case 'Overdue':
    default:
      return 'default';
  }
};

export { PAYMENTS_COLUMN_WIDTHS, getStatusVariant };
