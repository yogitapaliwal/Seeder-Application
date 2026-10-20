import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledSparkline = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 73,
  height: 22.33,

  '& img': {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'contain',
  },
});
