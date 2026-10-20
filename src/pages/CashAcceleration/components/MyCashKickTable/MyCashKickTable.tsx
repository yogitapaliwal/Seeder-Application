import TableCellContent from '@/components/atoms/TableCellContent';
import TableHeaderCell from '@/components/atoms/TableHeaderCell';
import TableCell from '@/components/atoms/TableCell';
import Tag from '@/components/atoms/Tag/Tag';
import TableRow from '@/components/molecules/TableRow/TableRow';
import Table from '@/components/molecules/Table/Table';
import Icon from '@/components/atoms/Icon/Icon';
import TableSkeletonRows from '@/components/molecules/TableSkeletonRows';
import EmptyState from '@/components/molecules/EmptyState';
import { formatCurrency } from '@/utils/currencyformatter';
import { MyCashKickTableProps } from '@/pages/CashAcceleration/components/MyCashKickTable/MyCashKickTable.types';
import {
  CASH_KICK_COLUMN_WIDTHS,
  getStatusVariant,
} from '@/pages/CashAcceleration/components/MyCashKickTable/utils';

const tableHeader = (
  <>
    <TableHeaderCell width={199.2} variant="text" label="Name" />
    <TableHeaderCell width={199.2} variant="text" label="Status" />
    <TableHeaderCell width={199.2} variant="text" label="Maturity" />
    <TableHeaderCell width={199.2} variant="text" label="Total recieved" />
    <TableHeaderCell width={199.2} variant="text" label="Total financed" />
  </>
);

const MyCashKickTable = ({
  myCashKicks,
  loading = false,
  error,
  onRetry,
  handleLaunchCashKick,
}: MyCashKickTableProps) => {
  const renderErrorState = () => {
    return (
      <EmptyState
        variant="error"
        icon={<Icon name="warning" size={160} />}
        title="Oops! Failed to connect"
        subtitle="Please contact customer support if this problem persists"
        onAction={onRetry}
        actionLabel="Retry"
      />
    );
  };

  const renderEmptyState = () => {
    return (
      <EmptyState
        variant="empty"
        icon={<Icon name="cheque" size={160} />}
        title="You don’t have any Cash Kick"
        onAction={handleLaunchCashKick}
        actionLabel="Launch A new cash kick"
      />
    );
  };

  const renderTableRows = () => {
    return myCashKicks.map((mycashkick) => {
      const { id, name, status, maturity, totalReceived, feePercentage, totalFinanced } =
        mycashkick;

      return (
        <TableRow key={id}>
          <TableCell width={199.2}>
            <TableCellContent variant="text" text={name} color="text.primary" />
          </TableCell>

          <TableCell width={199.2}>
            <Tag label={status} variant={getStatusVariant(status)} />
          </TableCell>

          <TableCell width={199.2}>
            <TableCellContent variant="text" text={maturity} color="text.disabled" />
          </TableCell>

          <TableCell width={199.2}>
            <TableCellContent
              variant="text-subtitle"
              title={formatCurrency(totalReceived)}
              subtitle={`${feePercentage.toFixed(1)}% fee`}
              titleColor="text.disabled"
              subtitleColor="text.disabled"
            />
          </TableCell>

          <TableCell width={199.2}>
            <TableCellContent
              variant="text"
              text={formatCurrency(totalFinanced)}
              color="text.disabled"
            />
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderContent = () => {
    if (error) return renderErrorState();
    if (!myCashKicks || myCashKicks.length === 0) return renderEmptyState();
    return renderTableRows();
  };

  return (
    <Table header={tableHeader}>
      {loading ? <TableSkeletonRows columnWidths={CASH_KICK_COLUMN_WIDTHS} /> : renderContent()}
    </Table>
  );
};

export default MyCashKickTable;
