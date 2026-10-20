import { SxProps, Theme } from '@mui/material/styles';
import MuiTypography, { TypographyProps } from '@mui/material/Typography';

export interface AppTypographyProps extends TypographyProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const Typography = ({ children, ...props }: AppTypographyProps) => {
  return <MuiTypography {...props}>{children}</MuiTypography>;
};

export default Typography;
