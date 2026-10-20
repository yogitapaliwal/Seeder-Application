import { TagVariant } from '@/components/atoms/Tag/Tag.types';
import { ContractStatus } from '@/api/contracts/contracts.types';

const CONTRACTS_COLUMN_WIDTHS = [168.5, 168.5, 168.5, 168.5, 168.5, 168.5];

const getStatusVariant = (status: ContractStatus): TagVariant => {
  switch (status) {
    case 'Available':
      return 'default';

    case 'Financed':
      return 'important';
    case 'Completed':
      return 'default';

    default:
      return 'default';
  }
};

export { CONTRACTS_COLUMN_WIDTHS, getStatusVariant };
