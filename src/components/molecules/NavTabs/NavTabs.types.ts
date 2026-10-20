import type { ButtonBaseProps } from '@mui/material/ButtonBase';

export type NavTabsState = 'active' | 'default';

export interface NavTabsProps extends Omit<ButtonBaseProps, 'children' | 'color'> {
  label: string;
  state?: NavTabsState;
  disabled?: boolean;
}
