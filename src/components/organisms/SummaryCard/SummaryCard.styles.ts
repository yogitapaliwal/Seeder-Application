import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  width: 340,
  flexShrink: 0,

  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),

  padding: theme.spacing(4),
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.secondary}`,
  backgroundColor: theme.palette.surface.elevation1,
}));

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '8px',
});

export const MetadataSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const AutoSelectWrapper = styled(Box)({
  width: '100%',
});

export const DividerWrapper = styled(Box)({
  width: '100%',
});

export const TotalSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Footer = styled(Box)({
  width: '100%',
});

export const getTitleStyles = () => ({
  color: 'text.primary',
});

export const getTotalLabelStyles = () => ({
  color: 'text.disabled',
});

export const getTotalValueStyles = () => ({
  color: 'text.primary',
});
