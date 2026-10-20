import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';

export const TabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1), // 8px, per Figma
}));

// Tab pill look, applied on top of Button's "text" variant via sx.
// Not an official Button variant — Figma's Button spec only defines
// Primary / Secondary / Tertiary / Text. Kept local to Tabs by design.
export const getTabButtonStyles = (theme: Theme, isActive: boolean) => ({
  padding: '12px 24px',
  gap: '8px',
  border: `1px solid ${isActive ? theme.palette.brand.purple400 : theme.palette.border.primary}`,
  color: isActive ? theme.palette.brand.purple400 : theme.palette.text.secondary,
  background: isActive ? theme.palette.brand.purple600 : theme.palette.grey[100],
  borderRadius: '12px',
  '&:hover': {
    borderColor: isActive ? theme.palette.brand.purple400 : theme.palette.border.primary,
  },
});
