import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const globalStyles = { 'html, body': { margin: 0, padding: 0 } };

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: theme.palette.surface.elevation0,
}));

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '250px',
  height: '100%',
  flexShrink: 0,
  backgroundColor: theme.palette.surface.elevation1,
  display: 'flex',
  flexDirection: 'column',
})) as typeof Box;

export const MainContent = styled(Box)({
  flex: 1,
  height: '100%',
  overflowY: 'auto',
  marginTop: '32px',
}) as typeof Box;
