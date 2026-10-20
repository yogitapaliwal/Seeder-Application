import { Theme } from '@mui/material/styles';
import { AvatarSize, AvatarVariant } from '@/components/atoms/Avatar/Avatar.types';

export const getAvatarStyles = (theme: Theme, size: AvatarSize, variant: AvatarVariant) => {
  const sizes = {
    small: {
      width: 24,
      height: 24,
    },
    medium: {
      width: 32,
      height: 32,
    },
    large: {
      width: 40,
      height: 40,
    },
  };

  return {
    display: variant === 'avatarWithIcon' ? 'inline-flex' : 'flex',
    alignItems: 'center',
    gap: variant === 'avatarWithIcon' ? theme.spacing(1) : 0,

    '& .MuiAvatar-root': {
      ...sizes[size],
      borderRadius: 12,
      flexShrink: 0,
    },

    '& .avatar-icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      color: theme.palette.text.secondary,
      flexShrink: 0,
    },
  };
};
