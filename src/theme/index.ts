import { createTheme } from '@mui/material/styles';
import { typography } from '@/theme/typography';
import { palette } from '@/theme/palette';

const theme = createTheme({
  typography,
  palette: {
    brand: palette.brand,

    text: palette.text,

    border: palette.border,

    icon: palette.icon,

    surface: palette.surface,

    grey: palette.grey,
  },
});

export default theme;
