import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  padding: theme.spacing(4),

  gap: '20px',

  borderRadius: '12px',
  backgroundColor: theme.palette.surface.elevation1,
  border: `1px solid ${theme.palette.border.secondary}`,
}));

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
}));

export const getTitleStyles = () => ({
  color: 'text.primary',
});
