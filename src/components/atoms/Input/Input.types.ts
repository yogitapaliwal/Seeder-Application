import React from 'react';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

export type InputState = 'default' | 'active' | 'filled';

export interface InputProps extends Omit<OutlinedInputProps, 'variant' | 'label' | 'color'> {
  label?: React.ReactNode;
  state?: InputState;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  infoIcon?: React.ReactNode;
  helperText?: React.ReactNode;
}
