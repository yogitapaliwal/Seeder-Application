import type { Theme } from '@mui/material/styles';
import type { NavTabsState } from '@/components/molecules/NavTabs/NavTabs.types';

const getStateStyles = (theme: Theme, state: NavTabsState, disabled?: boolean) => {
  if (state === 'active') {
    return {
      backgroundColor: theme.palette.brand.purple500,
      color: theme.palette.brand.white500,
      borderColor: theme.palette.brand.purple400,
    };
  }

  return {
    backgroundColor: theme.palette.surface.elevation1,
    color: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
    borderColor: theme.palette.border.primary,
  };
};

export const getRootStyles = (theme: Theme, state: NavTabsState, disabled?: boolean) => {
  const styles = getStateStyles(theme, state, disabled);

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1.5,
    border: `1px solid ${styles.borderColor}`,
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    px: theme.spacing(3),
    py: theme.spacing(1.5),
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.56 : 1,
    transition: theme.transitions.create(['background-color', 'color', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: disabled ? undefined : theme.palette.surface.elevation2,
      borderColor: disabled ? undefined : theme.palette.brand.purple400,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.brand.purple400}`,
      outlineOffset: 2,
    },
  };
};

export const getLabelStyles = () => ({
  fontWeight: 600,
});
