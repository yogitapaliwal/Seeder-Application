import { StyledTableHeader } from '@/components/molecules/TableHeader/TableHeader.styles';
import { TableHeaderProps } from '@/components/molecules/TableHeader/TableHeader.types';

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <StyledTableHeader>
      {columns.map((column) => (
        <div key={column.id}>{column.content}</div>
      ))}
    </StyledTableHeader>
  );
};

export default TableHeader;
