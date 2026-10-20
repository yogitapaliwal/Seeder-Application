import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  minHeight: 22,
});

export const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '3px', // 8px
});

export const getLabelStyles = () => ({
  color: 'text.disabled',
});

export const getSecondaryValueStyles = () => ({
  color: 'text.disabled',
});

export const getValueStyles = () => ({
  color: 'text.primary',
});
