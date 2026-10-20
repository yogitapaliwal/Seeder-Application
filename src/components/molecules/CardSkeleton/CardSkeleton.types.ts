import { SxProps, Theme } from '@mui/material/styles';

export interface CardSkeletonProps {
  showBadge?: boolean;
  mediaShape?: 'square' | 'circle' | 'none';
  mediaSize?: number;
  lines?: number;
  showButton?: boolean;
  sx?: SxProps<Theme>;
  width?: number;
  height?: number;
}
