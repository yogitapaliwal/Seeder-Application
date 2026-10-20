import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledTableRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{
  selected?: boolean;
}>(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  minHeight: 62,
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  boxSizing: 'border-box',
  ...(selected && {
    backgroundColor: theme.palette.brand.purple600,
  }),

  '&:last-child': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: selected ? theme.palette.brand.purple600 : theme.palette.action.hover,
  },
}));
