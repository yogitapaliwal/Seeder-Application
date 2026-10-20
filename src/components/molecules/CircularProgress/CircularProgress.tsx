import MuiCircularProgress from '@mui/material/CircularProgress';

import {
  Container,
  Label,
  getIndicatorStyles,
  getTrackStyles,
} from '@/components/molecules/CircularProgress/CircularProgress.styles';

import { CircularProgressProps } from '@/components/molecules/CircularProgress/CircularProgress.types';

const CircularProgress = ({
  value,
  size = 128,
  thickness = 4,
  showLabel = true,
}: CircularProgressProps) => {
  return (
    <Container>
      <MuiCircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={getTrackStyles()}
      />

      <MuiCircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        sx={getIndicatorStyles()}
      />

      {showLabel && (
        <Label variant="body1" color="brand.cyan300">
          {`${value}%`}
        </Label>
      )}
    </Container>
  );
};

export default CircularProgress;
