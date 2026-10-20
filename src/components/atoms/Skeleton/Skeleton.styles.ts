import MuiSkeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

export const StyledSkeleton = styled(MuiSkeleton)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.surface.elevation2,
  transform: 'none', // MUI applies scaleY transform by default; not needed for our fixed rects
}));
