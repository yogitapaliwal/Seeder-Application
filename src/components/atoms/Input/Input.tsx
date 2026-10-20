import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  getEndAdornmentStyles,
  getHelperTextStyles,
  getLabelStyles,
  getLabelWrapperStyles,
  getOutlinedInputStyles,
  getRootStyles,
  getStartAdornmentStyles,
} from '@/components/atoms/Input/Input.styles';
import { InputProps } from '@/components/atoms/Input/Input.types';

const Input = ({
  label,
  state = 'default',
  startIcon,
  endIcon,
  infoIcon,
  helperText,
  sx,
  inputProps,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputAriaLabel = typeof label === 'string' ? label : undefined;
  const effectiveState = isFocused ? 'active' : state;

  return (
    <Box sx={getRootStyles()}>
      {label ? (
        <Box sx={getLabelWrapperStyles()}>
          <Typography component="span" variant="body1" sx={getLabelStyles(theme, effectiveState)}>
            {label}
          </Typography>
          {infoIcon}
        </Box>
      ) : null}

      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          {...props}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          inputProps={{
            ...inputProps,
            ...(inputAriaLabel ? { 'aria-label': inputAriaLabel } : {}),
          }}
          startAdornment={
            startIcon ? (
              <InputAdornment position="start" sx={getStartAdornmentStyles(theme, effectiveState)}>
                {startIcon}
              </InputAdornment>
            ) : undefined
          }
          endAdornment={
            endIcon ? (
              <InputAdornment position="end" sx={getEndAdornmentStyles(theme, effectiveState)}>
                {endIcon}
              </InputAdornment>
            ) : undefined
          }
          sx={{
            ...getOutlinedInputStyles(theme, effectiveState),
            ...sx,
          }}
        />
        {helperText ? (
          <FormHelperText sx={getHelperTextStyles(theme)}>{helperText}</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
};

export default Input;
