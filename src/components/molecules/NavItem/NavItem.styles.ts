import { Theme } from '@mui/material/styles';

export const getNavItemStyles = (theme: Theme, isActive: boolean, hasIcon: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  gap: hasIcon ? theme.spacing(1) : 0,
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1.5),
  backgroundColor: isActive ? theme.palette.surface.elevation2 : 'transparent',
  color: isActive ? theme.palette.icon.primary : theme.palette.icon.secondary,
  textDecoration: 'none',
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),
});

export const getNavItemTextStyles = (theme: Theme, isActive: boolean) => ({
  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
  fontWeight: isActive ? 600 : 500,
});

export const getLeadingIconWrapperStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  flexShrink: 0,
});
