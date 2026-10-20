import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ProgressTrack = styled(Box)({
  width: 72,
  height: 4,
  borderRadius: 1,
  backgroundColor: '#3A3940', // Gamma/Grey 300
  overflow: 'hidden',
});

interface ProgressFillProps {
  percentage: number;
}

export const ProgressFill = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'percentage',
})<ProgressFillProps>(({ percentage }) => ({
  width: `${percentage}%`,
  height: '100%',
  borderRadius: 1,
  backgroundColor: '#5A42F6',
}));
