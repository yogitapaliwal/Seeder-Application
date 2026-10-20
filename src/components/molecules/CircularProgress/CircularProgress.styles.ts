import Box from '@mui/material/Box';
import Typography from '@/components/atoms/Typography/Typography';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Label = styled(Typography)({
  position: 'absolute',
});

export const getTrackStyles = () => ({
  color: 'grey.500',
  position: 'absolute' as const,
});

export const getIndicatorStyles = () => ({
  color: 'brand.cyan300',
});
