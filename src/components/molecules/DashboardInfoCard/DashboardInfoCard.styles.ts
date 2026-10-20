import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 259, // per Figma
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.surface.elevation1,
  border: `1px solid ${theme.palette.border.secondary}`,
  boxSizing: 'border-box',
}));

export const TagWrapper = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px',
});

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  height: '80px',
  marginTop: '13.5px',
  marginBottom: theme.spacing(3),
}));

export const Content = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const TitleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  marginBottom: theme.spacing(1), // 8px, per Figma (was 16px)
}));

export const getTitleStyles = () => ({
  color: 'text.secondary',
});
