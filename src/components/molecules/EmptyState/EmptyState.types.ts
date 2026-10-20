import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export type EmptyStateVariant = 'success' | 'empty' | 'error';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  sx?: SxProps<Theme>;
  variant: EmptyStateVariant;
}
