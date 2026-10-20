import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

interface ItemProps {
  label: string;
  leadingIcon?: ReactNode;
  onClick?: () => void;
}

export interface SidebarProps {
  logo: ReactNode;
  items: ItemProps[];
  footer?: ReactNode;
  sx?: SxProps<Theme>;
}
