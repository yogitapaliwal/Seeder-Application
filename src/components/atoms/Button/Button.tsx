import MuiButton from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { ButtonProps } from '@/components/atoms/Button/Button.types';
import { getButtonStyles } from '@/components/atoms/Button/Button.styles';

const Button = ({ variant = 'primary', size = 'large', children, sx, ...props }: ButtonProps) => {
  const theme = useTheme();

  return (
    <MuiButton
      disableRipple
      sx={[getButtonStyles(theme, variant, size), ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
