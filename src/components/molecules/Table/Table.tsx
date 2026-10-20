import {
  StyledBody,
  StyledTable,
  StyledHeader,
  StyledScrollContainer,
} from '@/components/molecules/Table/Table.styles';

import { TableProps } from '@/components/molecules/Table/Table.types';

const Table = ({ header, children, maxHeight }: TableProps) => {
  return (
    <StyledTable>
      <StyledScrollContainer maxHeight={maxHeight}>
        <StyledHeader>{header}</StyledHeader>

        <StyledBody>{children}</StyledBody>
      </StyledScrollContainer>
    </StyledTable>
  );
};

export default Table;
