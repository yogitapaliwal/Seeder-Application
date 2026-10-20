import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export type AvatarSize = 'small' | 'medium' | 'large';

export type AvatarVariant = 'avatar' | 'avatarWithIcon';

export interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  icon?: ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}
