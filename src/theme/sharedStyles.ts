import { Theme } from '@mui/material/styles';

// Shared by CashAccelerationCard and MetricSkeleton so the loading skeleton
// lines up pixel-for-pixel with the real card it stands in for.
export const getIconContainerStyles = (theme: Theme) => ({
  width: 80,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.border.secondary}`,
  borderRadius: '12px',
  backgroundColor: theme.palette.grey[100],
  gap: '20px',
  padding: '20px',
  marginBottom: theme.spacing(4),
});
