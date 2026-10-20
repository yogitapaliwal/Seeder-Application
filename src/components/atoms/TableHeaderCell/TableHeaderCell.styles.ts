import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { TableHeaderCellVariant } from '@/components/atoms/TableHeaderCell/TableHeaderCell.types';
import Typography from '@/components/atoms/Typography/Typography';

interface StyledTableHeaderCellProps {
  variant: TableHeaderCellVariant;
  width?: number | string;
}

export const HeaderLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  whiteSpace: 'nowrap',
  variant: 'body2',
}));

export const StyledTableHeaderCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'width',
})<StyledTableHeaderCellProps>(({ theme, variant, width }) => ({
  width,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: variant === 'icon' ? 'center' : 'space-between',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2.5),
  boxSizing: 'border-box',
  flexShrink: 0,
}));
