import TableCellContent from '@/components/atoms/TableCellContent';
import TableHeaderCell from '@/components/atoms/TableHeaderCell';
import TableCell from '@/components/atoms/TableCell';
import Tag from '@/components/atoms/Tag/Tag';
import TableRow from '@/components/molecules/TableRow/TableRow';
import Table from '@/components/molecules/Table/Table';
import TableSkeletonRows from '@/components/molecules/TableSkeletonRows';
import ContractsEmptyState from '@/components/molecules/ContractsEmptyState';
import { CashAccelerationTableProps } from '@/pages/CashAcceleration/components/CashAccelerationTable/CashAccelerationTable.types';
import {
  CONTRACTS_COLUMN_WIDTHS,
  getStatusVariant,
} from '@/pages/CashAcceleration/components/CashAccelerationTable/utils';
import { formatCurrency } from '@/utils/currencyformatter';

const tableHeader = (
  <>
    <TableHeaderCell width={168.5} variant="text" label="Name" />
    <TableHeaderCell width={168.5} variant="text" label="Status" />
    <TableHeaderCell width={168.5} variant="text" label="Type" />
    <TableHeaderCell width={168.5} variant="text" label="Per Payment" />
    <TableHeaderCell width={168.5} variant="text" label="Total Financed" />
    <TableHeaderCell width={168.5} variant="text" label="Total Available" />
  </>
);

const CashAccelerationTable = ({
  contracts,
  loading = false,
  error,
  onRetry,
}: CashAccelerationTableProps) => {
  const renderTableRows = () => {
    return contracts.map((contract) => (
      <TableRow key={contract.id}>
        <TableCell width={168.5}>
          <TableCellContent variant="text" text={contract.name} color="text.primary" />
        </TableCell>

        <TableCell width={168.5}>
          <Tag label={contract.status} variant={getStatusVariant(contract.status)} />
        </TableCell>

        <TableCell width={168.5}>
          <TableCellContent variant="text" text={contract.type} color="text.disabled" />
        </TableCell>

        <TableCell width={168.5}>
          <TableCellContent
            variant="text"
            text={formatCurrency(contract.perPayment)}
            color="text.disabled"
          />
        </TableCell>

        <TableCell width={168.5}>
          <TableCellContent
            variant="text"
            text={formatCurrency(contract.totalFinanced ?? 0)}
            color="text.disabled"
          />
        </TableCell>

        <TableCell width={168.5}>
          <TableCellContent
            variant="text"
            text={formatCurrency(contract.totalAvailable)}
            color="text.disabled"
          />
        </TableCell>
      </TableRow>
    ));
  };

  const renderContent = () => {
    if (error) return <ContractsEmptyState variant="error" onRetry={onRetry} />;
    if (!contracts || contracts.length === 0) return <ContractsEmptyState variant="empty" />;
    return renderTableRows();
  };

  return (
    <Table header={tableHeader}>
      {loading ? <TableSkeletonRows columnWidths={CONTRACTS_COLUMN_WIDTHS} /> : renderContent()}
    </Table>
  );
};

export default CashAccelerationTable;
