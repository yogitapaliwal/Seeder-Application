import { Theme } from '@mui/material/styles';

export const getGreetingStyles = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
  flexShrink: 0,
});

export const getTitleStyles = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

export const getWaveEmojiStyles = () => ({
  fontWeight: 600,
});

export const getDateStyles = (theme: Theme) => ({
  color: theme.palette.text.disabled,
});
