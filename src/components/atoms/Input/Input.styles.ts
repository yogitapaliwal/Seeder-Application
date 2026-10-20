import { Theme } from '@mui/material/styles';
import { InputState } from '@/components/atoms/Input/Input.types';

export const getRootStyles = () => ({
  width: '100%',
});

export const getLabelWrapperStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 1.25,
});

export const getLabelStyles = (theme: Theme, state: InputState) => ({
  color: state === 'active' ? theme.palette.brand.purple400 : theme.palette.text.disabled,
  fontWeight: 600,
  fontSize: '0.95rem',
});

export const getStartAdornmentStyles = (theme: Theme, state: InputState) => ({
  color: state === 'active' ? theme.palette.brand.purple400 : theme.palette.icon.secondary,
  ml: 0.5,
});

export const getEndAdornmentStyles = (theme: Theme, state: InputState) => ({
  color: state === 'active' ? theme.palette.brand.purple400 : theme.palette.icon.secondary,
  mr: 0.5,
});

export const getOutlinedInputStyles = (theme: Theme, state: InputState) => {
  const isActive = state === 'active';
  const isFilled = state === 'filled';

  return {
    minHeight: 56,
    borderRadius: '12px',
    backgroundColor: isFilled ? theme.palette.surface.elevation2 : theme.palette.surface.elevation1,
    color: theme.palette.text.primary,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isActive ? theme.palette.brand.purple500 : theme.palette.border.primary,
      borderWidth: 1,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isActive ? theme.palette.brand.purple500 : theme.palette.border.primary,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.brand.purple500,
      borderWidth: 1.5,
      boxShadow: `0 0 0 3px ${theme.palette.brand.purple500}1A`,
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
      padding: '14px 16px',
      fontSize: '0.95rem',
    },
    '& .MuiInputBase-input::placeholder': {
      color: theme.palette.text.disabled,
      opacity: 1,
    },
  };
};

export const getHelperTextStyles = (theme: Theme) => ({
  mt: 1,
  ml: 0.5,
  color: theme.palette.text.secondary,
  fontSize: '0.8rem',
});
