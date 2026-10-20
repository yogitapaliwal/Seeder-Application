import { styled } from '@mui/material/styles';

import { TagVariant } from '@/components/atoms/Tag/Tag.types';
import Box from '@mui/material/Box';

interface StyledTagProps {
  tagVariant: TagVariant;
}

export const StyledTag = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tagVariant',
})<StyledTagProps>(({ tagVariant }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 25,
  padding: '4px 8px',
  borderRadius: 4,
  boxSizing: 'border-box',

  fontFamily: 'Manrope',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '100%',
  letterSpacing: '1%',

  ...(tagVariant === 'default' && {
    backgroundColor: '#2D2D30',
    color: '#C9C8CC',
  }),

  ...(tagVariant === 'important' && {
    backgroundColor: '#E39AB2',
    color: '#201F24',
  }),
}));
