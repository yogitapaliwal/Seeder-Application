import { TagVariant } from '@/components/atoms/Tag/Tag.types';
import { CashKickStatus } from '@/api/cashkicks/cashkicks.types';

const CASH_KICK_COLUMN_WIDTHS: number[] = [199.2, 199.2, 199.2, 199.2, 199.2];

const getStatusVariant = (status: CashKickStatus): TagVariant => {
  switch (status) {
    case 'Pending':
      return 'default';

    case 'Approved':
      return 'important';

    case 'Rejected':
      return 'default';

    default:
      return 'default';
  }
};

export { CASH_KICK_COLUMN_WIDTHS, getStatusVariant };
