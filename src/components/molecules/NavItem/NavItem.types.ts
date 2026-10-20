import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

interface NavItemBaseProps {
  label: string;
  leadingIcon?: ReactNode;
  disabled?: boolean;
  activeMatchers?: string[];
  sx?: SxProps<Theme>;
}

interface NavItemLinkProps extends NavItemBaseProps {
  to: string;
  onClick?: never;
}

interface NavItemActionProps extends NavItemBaseProps {
  to?: never;
  onClick?: () => void;
}

export type NavItemProps = NavItemLinkProps | NavItemActionProps;
