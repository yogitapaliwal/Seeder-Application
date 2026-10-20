import { StyledTableRow } from '@/components/molecules/TableRow/TableRow.styles';
import { TableRowProps } from '@/components/molecules/TableRow/TableRow.types';

const TableRow = ({ children, selected }: TableRowProps) => {
  return <StyledTableRow selected={selected}>{children}</StyledTableRow>;
};

export default TableRow;
