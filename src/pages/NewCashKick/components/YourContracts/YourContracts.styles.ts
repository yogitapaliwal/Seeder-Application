import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  background: theme.palette.surface.elevation1,
  maxWidth: '700px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.secondary}`,
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: theme.spacing(4),
  gap: '8px',
}));

export const TableContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: `0 0 ${theme.spacing(4)} ${theme.spacing(4)}`,
  overflow: 'hidden',
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
}));

export const getCheckboxCellStyles = () => ({
  px: 0,
  justifyContent: 'center',
});

export const getTitleStyles = () => ({
  color: 'text.primary',
});

export const getSelectAllLoaderStyles = () => ({
  color: 'brand.purple400',
});
