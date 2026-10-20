import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface TitleBarProps {
  greeting: ReactNode;
  avatar: ReactNode;
  sx?: SxProps<Theme>;
}
