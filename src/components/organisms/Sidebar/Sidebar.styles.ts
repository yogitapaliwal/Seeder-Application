import { Theme } from '@mui/material/styles';

export const getSidebarStyles = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '100%',
  height: '100%',
  padding: '40px 20px 20px',
  gap: theme.spacing(5),
  flexShrink: 0,
  backgroundColor: theme.palette.surface.elevation1,
  borderRight: `1px solid #222124`, // This is not define in typography.
  boxSizing: 'border-box',
});

export const getSidebarContentStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '4px',
  flex: 1,
});

export const getSidebarFooterStyles = () => ({
  width: '100%',
  marginTop: 'auto',
});
