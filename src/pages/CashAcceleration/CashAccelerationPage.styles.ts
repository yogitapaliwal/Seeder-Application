import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: theme.spacing(5, 3.5), // 40px 28px
})) as typeof Box;

export const Content = styled(Box)({
  width: '1060px',
  display: 'flex',
  flexDirection: 'column',
});

export const TopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  gap: theme.spacing(2.5), // 20px
  marginTop: theme.spacing(4), // 32px after TitleBar
}));

export const BottomSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5), // 20px
}));

export const getNewCashKickButtonStyles = () => ({
  width: '100%',
});
