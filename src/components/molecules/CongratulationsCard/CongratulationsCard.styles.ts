import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const CardContainer = styled(Box)<{ backgroundImage: string }>(({ backgroundImage }) => ({
  width: '700px',
  height: '259px',
  borderRadius: '12px',
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
}));

export const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  width: '100%',
  minHeight: '193px',
  padding: '32px',
  boxSizing: 'border-box',
});

export const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '12px',
});

export const getTitleStyles = () => ({
  color: 'text.white',
  maxWidth: '265px',
});

export const getDescriptionStyles = () => ({
  color: 'text.primary',
  maxWidth: '277px',
});

export const getHighlightStyles = () => ({
  fontWeight: 700,
});
