import Tooltip from '@mui/material/Tooltip';
import MuiCircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@/components/atoms/Checkbox';
import Icon from '@/components/atoms/Icon/Icon';
import TableCellContent from '@/components/atoms/TableCellContent';
import TableHeaderCell from '@/components/atoms/TableHeaderCell';
import TableCell from '@/components/atoms/TableCell/TableCell';
import Typography from '@/components/atoms/Typography/Typography';
import TableRow from '@/components/molecules/TableRow/TableRow';
import Table from '@/components/molecules/Table/Table';
import TableSkeletonRows from '@/components/molecules/TableSkeletonRows';
import ContractsEmptyState from '@/components/molecules/ContractsEmptyState';
import theme from '@/theme';
import { formatCurrency } from '@/utils/currencyformatter';
import {
  Header,
  PaginationContainer,
  Root,
  TableContainer,
  getCheckboxCellStyles,
  getSelectAllLoaderStyles,
  getTitleStyles,
} from '@/pages/NewCashKick/components/YourContracts/YourContracts.styles';
import { YourContractsProps } from '@/pages/NewCashKick/components/YourContracts/YourContracts.types';
import { CONTRACTS_COLUMN_WIDTHS } from '@/pages/NewCashKick/components/YourContracts/utils';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import Pagination from '@/components/molecules/Pagination/Pagination';

const tableHeader = (
  <>
    <TableHeaderCell width={144} variant="text" label="Name" />
    <TableHeaderCell width={124} variant="text" label="Type" />
    <TableHeaderCell width={160} variant="text" label="Per Payment" />
    <TableHeaderCell width={144} variant="text" label="Term Length" />
    <TableHeaderCell width={160} variant="text" label="Payment amount" />
  </>
);

const YourContracts = ({
  contracts,
  selectedRows,
  allSelected = false,
  someSelected = false,
  currentPage,
  loading = false,
  error,
  onRetry,
  totalPages,
  handlePageChange,
  handleSelectAll,
  handleSelectAllDisabled = false,
  handleRowSelection,
  remainingCredit,
  readOnly = false,
}: YourContractsProps) => {
  const renderTableRows = () => {
    return contracts.map((contract) => {
      const { id, name, type, perPayment, termLengthMonths, feePercentage, paymentAmount } =
        contract;
      const isSelected = selectedRows.includes(id);
      const isDisabled = !isSelected && remainingCredit < paymentAmount;

      return (
        <TableRow key={id} selected={isSelected}>
          {!readOnly && (
            <TableCell width={44} sx={getCheckboxCellStyles()}>
              <Tooltip
                title={isDisabled ? 'This would exceed your available credit' : ''}
                disableHoverListener={!isDisabled}
              >
                <span>
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => handleRowSelection?.(id)}
                  />
                </span>
              </Tooltip>
            </TableCell>
          )}

          <TableCell width={144}>
            <TableCellContent variant="text" text={name} color={theme.palette.text.primary} />
          </TableCell>
          <TableCell width={124}>
            <TableCellContent variant="text" text={type} color={theme.palette.text.disabled} />
          </TableCell>
          <TableCell width={160}>
            <TableCellContent
              variant="text"
              text={formatCurrency(perPayment)}
              color={theme.palette.text.disabled}
            />
          </TableCell>
          <TableCell width={144}>
            <TableCellContent
              variant="text-subtitle"
              title={`${termLengthMonths} months`}
              subtitle={`${feePercentage.toFixed(1)}% fee`}
              titleColor={theme.palette.text.disabled}
              subtitleColor={theme.palette.text.disabled}
            />
          </TableCell>
          <TableCell width={160}>
            <TableCellContent
              variant="text"
              text={formatCurrency(paymentAmount)}
              color={theme.palette.text.disabled}
            />
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderContent = () => {
    if (error) return <ContractsEmptyState variant="error" onRetry={onRetry} />;
    if (!contracts || contracts.length === 0) return <ContractsEmptyState variant="empty" />;
    return renderTableRows();
  };

  return (
    <Root>
      <Header>
        <Typography variant="heading2" sx={getTitleStyles()}>
          Your Contracts
        </Typography>
        <Icon name="info-circle" size={20} />
      </Header>
      <TableContainer>
        <Table
          header={
            <>
              {!readOnly && (
                <TableHeaderCell
                  variant="icon"
                  width={44}
                  icon={
                    handleSelectAllDisabled ? (
                      <MuiCircularProgress
                        size={18}
                        thickness={5}
                        sx={getSelectAllLoaderStyles()}
                      />
                    ) : (
                      <Checkbox
                        checked={allSelected}
                        indeterminate={someSelected}
                        onChange={handleSelectAll}
                      />
                    )
                  }
                />
              )}
              {tableHeader}
            </>
          }
          maxHeight={readOnly ? 400 : undefined}
          maxWidth={700}
        >
          {loading ? (
            <TableSkeletonRows
              rowCount={readOnly ? contracts.length : DEFAULT_PAGE_SIZE}
              columnWidths={readOnly ? CONTRACTS_COLUMN_WIDTHS : [50, ...CONTRACTS_COLUMN_WIDTHS]}
            />
          ) : (
            renderContent()
          )}
        </Table>
        {totalPages > 1 && handlePageChange && (
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </PaginationContainer>
        )}
      </TableContainer>
    </Root>
  );
};

export default YourContracts;
