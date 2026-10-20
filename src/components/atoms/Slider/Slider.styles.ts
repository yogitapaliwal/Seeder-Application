import MuiSlider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const StyledSlider = styled(MuiSlider, {
  shouldForwardProp: (prop) => prop !== 'warning',
})<{ warning?: boolean }>(({ theme, warning }) => ({
  height: 8,
  padding: 0,
  borderRadius: 8,

  '& .MuiSlider-rail': {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#3A3A3D',
    opacity: 1,
  },

  '& .MuiSlider-track': {
    height: 8,
    borderRadius: 8,
    backgroundColor: warning ? theme.palette.warning.main : theme.palette.brand.purple500,
    border: 'none',
  },

  '& .MuiSlider-thumb': {
    width: 23,
    height: 23,
    borderRadius: 8,
    backgroundColor: warning ? theme.palette.warning.main : theme.palette.brand.purple500,
    border: `3px solid ${warning ? theme.palette.warning.light : theme.palette.brand.purple400}`,

    '&:hover, &.Mui-focusVisible': {
      boxShadow: 'none',
    },

    '&.Mui-active': {
      boxShadow: 'none',
    },
  },

  '&.Mui-disabled': {
    '& .MuiSlider-rail': {
      opacity: 0.5,
    },
    '& .MuiSlider-track': {
      opacity: 0.5,
    },
    '& .MuiSlider-thumb': {
      opacity: 0.5,
    },
  },
}));
