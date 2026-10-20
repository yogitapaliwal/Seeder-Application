import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { getIconContainerStyles } from '@/theme/sharedStyles';

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  borderRadius: '12px',
  backgroundColor: theme.palette.surface.elevation1,
}));

export const MetricPlaceholder = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const IconContainer = styled(Box)(({ theme }) => getIconContainerStyles(theme));

export const TitleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));
