import TableHeaderCell from '@/components/atoms/TableHeaderCell';
import TableCell from '@/components/atoms/TableCell';
import { YourPaymentsProps } from '@/pages/Home/components/YourPayments/YourPayments.types';
import {
  Header,
  PaginationContainer,
  TableContainer,
  YourPaymentsContainer,
  getAmountStyles,
} from '@/pages/Home/components/YourPayments/YourPayments.styles';
import Icon from '@/components/atoms/Icon/Icon';
import Table from '@/components/molecules/Table/Table';
import TableRow from '@/components/molecules/TableRow/TableRow';
import Tag from '@/components/atoms/Tag/Tag';
import Pagination from '@/components/molecules/Pagination/Pagination';
import Typography from '@/components/atoms/Typography/Typography';
import TableCellContent from '@/components/atoms/TableCellContent';
import TableSkeletonRows from '@/components/molecules/TableSkeletonRows';
import EmptyState from '@/components/molecules/EmptyState';
import {
  getStatusVariant,
  PAYMENTS_COLUMN_WIDTHS,
} from '@/pages/Home/components/YourPayments/utils';
import { formatAmount } from '@/utils/currencyformatter';

const tableHeader = (
  <>
    <TableHeaderCell width={252.75} label="Due date" variant="text" />
    <TableHeaderCell width={252.75} label="Status" variant="text" />
    <TableHeaderCell width={252.75} label="Expected Amount" variant="text" />
    <TableHeaderCell width={252.75} label="Outstanding" variant="text" />
  </>
);

const YourPayments = ({
  payments,
  loading = false,
  currentPage,
  handlePageChange,
  error,
  totalPages,
  onRetry,
  handleLaunchCashKick,
}: YourPaymentsProps) => {
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
        actionLabel="Launch a new cash kick"
      />
    );
  };

  const renderPaymentTable = () => {
    return payments.map((payment) => (
      <TableRow key={payment.id}>
        <TableCell width={252.75}>
          <TableCellContent
            variant="text-subtitle"
            title={payment.dueDate}
            subtitle="31 day(s) from now"
            titleColor="text.primary"
            subtitleColor="text.disabled"
          />
        </TableCell>

        <TableCell width={252.75}>
          <Tag label={payment.status} variant={getStatusVariant(payment.status)} />
        </TableCell>

        <TableCell width={252.75}>
          <Typography sx={getAmountStyles()} variant="body2">
            {formatAmount(payment.expectedAmount)}
          </Typography>
        </TableCell>

        <TableCell width={252.75}>
          <Typography variant="body2" sx={getAmountStyles()}>
            {formatAmount(payment.outstandingAmount)}
          </Typography>
        </TableCell>
      </TableRow>
    ));
  };

  const renderPaymentsContent = () => {
    if (error) return renderErrorState();
    if (!payments || payments.length === 0) return renderEmptyState();

    return renderPaymentTable();
  };

  return (
    <YourPaymentsContainer>
      <Header>
        <Typography variant="heading2">Your Payments</Typography>
        <Icon name="info-circle" size={20} />
      </Header>

      <TableContainer>
        <Table header={tableHeader}>
          {loading ? (
            <TableSkeletonRows columnWidths={PAYMENTS_COLUMN_WIDTHS} />
          ) : (
            renderPaymentsContent()
          )}
        </Table>

        {totalPages > 1 && (
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </PaginationContainer>
        )}
      </TableContainer>
    </YourPaymentsContainer>
  );
};

export default YourPayments;
