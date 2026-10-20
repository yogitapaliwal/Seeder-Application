import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import NavItem from '@/components/molecules/NavItem';
import { SidebarProps } from '@/components/organisms/Sidebar/Sidebar.types';
import {
  getSidebarContentStyles,
  getSidebarFooterStyles,
  getSidebarStyles,
} from '@/components/organisms/Sidebar/Sidebar.styles';

const Sidebar = ({ logo, items, footer, sx }: SidebarProps) => {
  const theme = useTheme();

  return (
    <Box component="aside" sx={[getSidebarStyles(theme), ...(Array.isArray(sx) ? sx : [sx])]}>
      {logo}

      <Box sx={getSidebarContentStyles()}>
        {items.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </Box>

      {footer && <Box sx={getSidebarFooterStyles()}>{footer}</Box>}
    </Box>
  );
};

export default Sidebar;
