import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  width: '100%',
  minWidth: 0,
}));

export const TitleContainer = styled(Box)({
  width: '100%',
  minWidth: 0,
});

export const SubtitleContainer = styled(Box)({
  width: '100%',
  minWidth: 0,
});

export const getTitleStyles = (titleColor?: string) => ({
  color: titleColor ?? 'text.primary',
});

export const getSubtitleStyles = (subtitleColor?: string) => ({
  color: subtitleColor ?? 'text.secondary',
});
