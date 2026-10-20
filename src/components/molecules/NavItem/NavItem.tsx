import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

import Typography from '@/components/atoms/Typography/Typography';

import {
  getLeadingIconWrapperStyles,
  getNavItemStyles,
  getNavItemTextStyles,
} from '@/components/molecules/NavItem/NavItem.styles';
import { NavItemProps } from '@/components/molecules/NavItem/NavItem.types';

const NavItem = ({
  label,
  to,
  onClick,
  leadingIcon,
  disabled = false,
  sx,
  activeMatchers,
}: NavItemProps) => {
  const theme = useTheme();
  const location = useLocation();

  const fallbackMatchers = to ? [to] : [];
  const matchers = activeMatchers && activeMatchers.length > 0 ? activeMatchers : fallbackMatchers;

  const isActive = matchers.some((path) => {
    // exact match for root-level paths like '/', prefix match otherwise
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  });

  const rootProps = to
    ? { component: Link, to }
    : { component: 'button' as const, onClick, type: 'button' as const };

  return (
    <ButtonBase
      {...rootProps}
      disabled={disabled}
      sx={[
        getNavItemStyles(theme, isActive, Boolean(leadingIcon)),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {leadingIcon && <Box sx={getLeadingIconWrapperStyles()}>{leadingIcon}</Box>}

      <Typography sx={getNavItemTextStyles(theme, isActive)}>{label}</Typography>
    </ButtonBase>
  );
};

export default NavItem;
