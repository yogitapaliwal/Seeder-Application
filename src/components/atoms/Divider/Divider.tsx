import MuiDivider from '@mui/material/Divider';
import { getDividerStyles } from '@/components/atoms/Divider/Divider.styles';

const Divider = ({ color = 'text.primary', ...props }) => (
  <MuiDivider sx={getDividerStyles(color)} {...props} />
);

export default Divider;
