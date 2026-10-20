import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { AvatarProps } from '@/components/atoms/Avatar/index';
import { getAvatarStyles } from '@/components/atoms/Avatar/Avatar.styles';

const Avatar = ({
  src,
  alt,
  size = 'large',
  variant = 'avatar',
  icon,
  onClick,
  sx,
}: AvatarProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={[getAvatarStyles(theme, size, variant), ...(Array.isArray(sx) ? sx : [sx])]}
      onClick={onClick}
    >
      <MuiAvatar src={src} alt={alt} />

      {variant === 'avatarWithIcon' && icon && <Box className="avatar-icon">{icon}</Box>}
    </Box>
  );
};

export default Avatar;
