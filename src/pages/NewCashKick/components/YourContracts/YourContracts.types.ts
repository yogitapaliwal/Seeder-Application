import { MyContract } from '@/api/contracts/contracts.types';
export interface YourContractsProps {
  contracts: MyContract[];
  selectedRows: string[];
  /** Header checkbox checked/indeterminate state - passed explicitly rather
   *  than derived from selectedRows.length vs a total count, since under a
   *  budget cap the selected count can never equal the full dataset size. */
  allSelected?: boolean;
  someSelected?: boolean;
  currentPage: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  totalPages: number;
  handlePageChange?: (page: number) => void;
  handleSelectAll?: () => void;
  handleSelectAllDisabled?: boolean;
  handleRowSelection?: (id: string) => void;
  remainingCredit: number;
  readOnly?: boolean;
}
