import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';
import { EmptyStateVariant } from '@/components/molecules/EmptyState/EmptyState.types';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: theme.spacing(2.5), // 20px, per Figma
  padding: '80px 40px',
  boxSizing: 'border-box',
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '347px',
  gap: theme.spacing(1), // 8px, per Figma
}));

export const getSubtitleStyles = (theme: Theme) => ({
  color: theme.palette.text.disabled,
  textAlign: 'center' as const,
});

export const getTitleStyles = (theme: Theme, variant: EmptyStateVariant) => {
  const variantStyles = {
    success: {
      color: theme.palette.text.primary,
    },
    empty: {
      color: theme.palette.text.disabled,
    },
    error: {
      color: theme.palette.text.primary,
    },
  };

  return {
    textAlign: 'center' as const,
    ...variantStyles[variant],
  };
};

export const getActionButtonStyles = () => ({
  typography: 'button',
});
