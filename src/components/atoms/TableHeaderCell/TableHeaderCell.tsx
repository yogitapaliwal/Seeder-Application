import {
  HeaderLabel,
  StyledTableHeaderCell,
} from '@/components/atoms/TableHeaderCell/TableHeaderCell.styles';
import { TableHeaderCellProps } from '@/components/atoms/TableHeaderCell/TableHeaderCell.types';

const TableHeaderCell = (props: TableHeaderCellProps) => {
  return (
    <StyledTableHeaderCell variant={props.variant} onClick={props.onClick} width={props.width}>
      {props.variant !== 'icon' && <HeaderLabel>{props.label}</HeaderLabel>}

      {'icon' in props && props.icon}
    </StyledTableHeaderCell>
  );
};

export default TableHeaderCell;
