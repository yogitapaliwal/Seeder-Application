import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
});

export const EllipsisContainer = styled(Box)({
  width: '100%',
  minWidth: 0,
});

export const getTextValueStyles = (color?: string) => ({
  color: color ?? 'text.primary',
});
