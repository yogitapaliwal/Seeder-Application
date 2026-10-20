import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import theme from '@/theme';

export const customScrollbar = (theme: Theme) => ({
  // Firefox doesn't support the ::-webkit-scrollbar-* pseudo-elements below -
  // without this it falls back to the OS default scrollbar, which shows up
  // as a plain white/light bar against this theme's dark surfaces.
  scrollbarWidth: 'thin' as const,
  scrollbarColor: `${theme.palette.icon.secondary} ${theme.palette.surface.elevation2}`,

  '&::-webkit-scrollbar': {
    width: 4,
    height: 8,
  },

  '&::-webkit-scrollbar-track': {
    background: theme.palette.surface.elevation2,
  },

  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.icon.secondary,
    borderRadius: 4,
  },
});

export const StyledTable = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const StyledBody = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 'max-content',
  minWidth: '100%',
});

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 2,
  background: theme.palette.grey[100],
  flexShrink: 0,
  width: 'max-content',
  minWidth: '100%',
  borderRadius: '8px',
}));

export const StyledScrollContainer = styled(Box)<{
  maxHeight?: number | string;
}>(({ maxHeight }) => ({
  width: '100%',
  overflow: 'auto',

  ...(maxHeight && {
    maxHeight,
  }),
  ...customScrollbar(theme),
}));
