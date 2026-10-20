import { Theme, SxProps, darken, lighten } from '@mui/material/styles';
import { ButtonSize, ButtonVariant } from '@/components/atoms/Button/Button.types';

export const getButtonStyles = (
  theme: Theme,
  variant: ButtonVariant,
  size: ButtonSize,
): SxProps<Theme> => {
  const sizes = {
    large: {
      height: 60,
      borderRadius: '12px',
      padding: '20px 40px',
      gap: '8px',
    },

    medium: {
      height: 43,
      borderRadius: '12px',
      padding: '12px 24px',
      gap: '8px',
    },

    small: {
      height: 31,
      borderRadius: '8px',
      padding: '6px 12px',
      gap: '8px',
    },
  };

  const variants = {
    primary: {
      backgroundColor: theme.palette.brand.purple500,
      color: theme.palette.brand.white500,
      '&:hover': {
        backgroundColor: lighten(theme.palette.brand.purple500, 0.08),
      },
      '&:active': {
        backgroundColor: darken(theme.palette.brand.purple500, 0.12),
      },
      '&.Mui-disabled': {
        opacity: 0.56,
        color: theme.palette.brand.white500,
      },
    },

    secondary: {
      backgroundColor: theme.palette.brand.white500,
      color: theme.palette.grey[100],
      border: `1px solid ${theme.palette.border.primary}`,
      '&:hover': {
        backgroundColor: darken(theme.palette.brand.white500, 0.04),
      },
      '&:active': {
        backgroundColor: darken(theme.palette.brand.white500, 0.08),
      },
    },

    tertiary: {
      backgroundColor: theme.palette.surface.elevation2,
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: lighten(theme.palette.surface.elevation2, 0.06),
      },
      '&:active': {
        backgroundColor: darken(theme.palette.surface.elevation2, 0.06),
      },
    },

    text: {
      backgroundColor: 'transparent',
      color: theme.palette.brand.purple400,
      padding: '4px 12px',
      gap: '4px',
      '&.Mui-disabled': {
        color: theme.palette.text.disabled,
      },
    },
    outlinedInverted: {
      backgroundColor: 'transparent',
      color: theme.palette.brand.white500,
      border: `1px solid ${theme.palette.brand.white500}`,
    },
  };

  return {
    ...sizes[size],
    ...variants[variant],
    ...theme.typography.button,
    textTransform: 'capitalize',
  };
};
