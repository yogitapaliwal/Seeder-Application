import Box from '@mui/material/Box';
import { TitleBarProps } from '@/components/molecules/TitleBar/TitleBar.types';
import { getTitleBarStyles } from '@/components/molecules/TitleBar/TitleBar.styles';

const TitleBar = ({ greeting, avatar, sx }: TitleBarProps) => {
  return (
    <Box sx={[getTitleBarStyles(), ...(Array.isArray(sx) ? sx : [sx])]}>
      {greeting}
      {avatar}
    </Box>
  );
};

export default TitleBar;
