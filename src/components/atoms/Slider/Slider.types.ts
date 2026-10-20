import { SliderProps as MuiSliderProps } from '@mui/material/Slider';

export interface SliderProps extends Omit<
  MuiSliderProps,
  'color' | 'size' | 'orientation' | 'track'
> {
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  warning?: boolean;
}
