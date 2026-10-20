import React from 'react';
import { ButtonBase, useTheme } from '@mui/material';
import Typography from '@/components/atoms/Typography/Typography';
import type { NavTabsProps } from '@/components/molecules/NavTabs/NavTabs.types';
import { getLabelStyles, getRootStyles } from '@/components/molecules/NavTabs/NavTabs.styles';

const NavTabs = ({
  label,
  state = 'default',
  disabled = false,
  onClick,
  sx,
  ...props
}: NavTabsProps) => {
  const theme = useTheme();
  const rootSx =
    typeof sx === 'function'
      ? [getRootStyles(theme, state, disabled), sx(theme)]
      : [getRootStyles(theme, state, disabled), sx];

  return (
    <ButtonBase
      focusRipple
      disabled={disabled}
      onClick={onClick}
      aria-pressed={state === 'active'}
      aria-disabled={disabled || undefined}
      sx={rootSx}
      {...props}
    >
      <Typography variant="body2" component="span" sx={getLabelStyles()}>
        {label}
      </Typography>
    </ButtonBase>
  );
};

export default NavTabs;
