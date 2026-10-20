import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 28px',
  overflowY: 'auto',
});

export const PageWrapperStyles = styled(Box)({
  width: '1060px',
  display: 'flex',
  flexDirection: 'column',
});

export const PageContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5), // 20px — spacing between TopSection and YourPayments
  marginTop: theme.spacing(4), // 32px — gap between TitleBar and page content, per Figma
  width: '100%',
}));

export const TopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  gap: theme.spacing(2.5), // 20px
  width: '100%',
}));

export const CongratulationsCardWrapper = styled(Box)({
  width: '700px',
  flexShrink: 0,
});

export const BannerWrapper = styled(Box)({
  width: '700px',
  flexShrink: 0,
  display: 'flex',
  gap: '20px',
});

export const CashKickCardWrapper = styled(Box)({
  width: '340px',
  flexShrink: 0,
});

export const IconContainer = styled(Box)<{ size: number }>(({ theme, size }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: size,
  height: size,
  padding: theme.spacing(2.5), // 20px, per Figma
  borderRadius: theme.spacing(1.5), // 12px, per Figma
  backgroundColor: theme.palette.grey[100], // #262529
  border: `1px solid ${theme.palette.border.secondary}`, // #28272B
  boxSizing: 'border-box',
  flexShrink: 0,
}));

export const getFullWidthButtonStyles = () => ({
  width: '100%',
});
