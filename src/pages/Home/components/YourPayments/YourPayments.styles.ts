import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const YourPaymentsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.surface.elevation1,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  boxSizing: 'border-box',
  border: `1px solid ${theme.palette.border.secondary}`,
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const TableContainer = styled(Box)({
  width: '100%',
});

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  width: '100%',
}));

export const getAmountStyles = () => ({
  color: 'text.disabled',
});
