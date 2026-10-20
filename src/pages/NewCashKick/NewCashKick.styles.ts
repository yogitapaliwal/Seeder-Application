import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import theme from '@/theme';

export const PageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 28px',
  overflowY: 'auto',
}) as typeof Box;

export const Content = styled(Box)({
  width: '100%',
  maxWidth: 1060,
  display: 'flex',
  flexDirection: 'column',
});

export const BackButtonWrapper = styled(Box)(({ theme }) => ({
  alignSelf: 'flex-start', // Prevent stretching
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const PageContent = styled(Box)({
  display: 'flex',
  gap: theme.spacing(2.5),
  width: '100%',
  alignItems: 'flex-start',
});

export const TopSection = styled(Box)({
  display: 'flex',
  gap: theme.spacing(2.5),
  width: '100%',
});

export const CongratulationsCardWrapper = styled(Box)({
  width: 700,
  flexShrink: 0,
});

export const CashKickCardWrapper = styled(Box)({
  width: 340,
  flexShrink: 0,
});

export const ContractsSection = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const SummarySection = styled(Box)({
  width: 340,
  flexShrink: 0,
});
