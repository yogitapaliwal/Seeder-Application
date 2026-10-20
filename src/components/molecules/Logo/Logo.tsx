import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { LogoProps } from '@/components/molecules/Logo/Logo.types';
import {
  getLogoIconStyles,
  getLogoStyles,
  getLogoTextStyles,
} from '@/components/molecules/Logo/Logo.styles';
import Typography from '@/components/atoms/Typography/Typography';
import Icon from '@/components/atoms/Icon/Icon';

const Logo = ({ text = 'Seeder', onClick, sx }: LogoProps) => {
  const theme = useTheme();

  return (
    <Box onClick={onClick} sx={[getLogoStyles(theme), ...(Array.isArray(sx) ? sx : [sx])]}>
      <Icon name="logo" sx={getLogoIconStyles()} />
      <Typography sx={getLogoTextStyles(theme)}>{text}</Typography>
    </Box>
  );
};

export default Logo;
