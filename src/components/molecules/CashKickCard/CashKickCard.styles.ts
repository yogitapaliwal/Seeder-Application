import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const CardContainer = styled(Box)({
  width: '100%',
  maxWidth: '340px',
  minHeight: '257px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '32px',
  borderRadius: '12px',
  border: '1px solid #28272B',
  backgroundColor: '#201F24',
  boxSizing: 'border-box',
});

export const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '276px',
});

export const ButtonContainer = styled(Box)({
  width: '276px',
});

export const getTitleStyles = () => ({
  color: 'text.primary',
});

export const getDescriptionStyles = () => ({
  color: 'text.disabled',
});

export const getHighlightStyles = () => ({
  fontWeight: 700,
  color: 'text.primary',
});
