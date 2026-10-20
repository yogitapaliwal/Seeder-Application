import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'outlinedInverted';

export type ButtonSize = 'large' | 'medium' | 'small';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;

  startIcon?: ReactNode;
  endIcon?: ReactNode;

  children: ReactNode;
}
