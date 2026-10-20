import { Theme } from '@mui/material/styles';

export const getLogoStyles = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: theme.spacing(1),
  padding: '2px 4px',
  cursor: 'pointer',
});

export const getLogoTextStyles = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  flex: '1 0 0',
  height: 32,
  color: theme.palette.text.primary,
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 'normal',
});

export const getLogoIconStyles = () => ({
  width: 30,
  height: 28,
  flexShrink: 0,
});
