import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subTitle: string;
  children: ReactNode;
  footer?: ReactNode;
  disableClose?: boolean;
  sx?: SxProps<Theme>;
}
