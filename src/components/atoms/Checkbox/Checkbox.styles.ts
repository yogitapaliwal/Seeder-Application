import MuiCheckbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

export const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  padding: 0,
  '& .MuiSvgIcon-root': {
    width: 20,
    height: 20,
  },

  '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate) .MuiSvgIcon-root': {
    color: theme.palette.icon.secondary,
  },

  '&.MuiCheckbox-root': {
    color: theme.palette.grey[400],
  },

  '&.Mui-checked': {
    color: theme.palette.brand.purple400,
  },

  '&.MuiCheckbox-indeterminate': {
    color: theme.palette.brand.purple400,
  },
}));
