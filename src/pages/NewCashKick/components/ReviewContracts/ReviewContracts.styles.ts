import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const UnderReviewContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(3),
}));

export const getUnderReviewTitleStyles = () => ({
  color: 'text.primary',
});

export const getUnderReviewDescriptionStyles = () => ({
  color: 'text.disabled',
});
