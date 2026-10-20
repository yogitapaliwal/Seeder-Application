import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const StyledCardRoot = styled(Box)<{ width?: number; height?: number }>(
  ({ theme, width }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.surface.elevation1,
    width,
  }),
);

export const StyledBadgeRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
}));

export const StyledMediaWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledLinesStack = styled(Stack)<{ hasButton?: boolean }>(({ theme, hasButton }) => ({
  marginBottom: hasButton ? theme.spacing(3) : 0,
}));

export const getBadgeSkeletonStyles = () => ({
  borderRadius: 4,
});

export const getMediaSkeletonStyles = (mediaShape: 'circle' | 'square' | 'none') => ({
  borderRadius: mediaShape === 'circle' ? '50%' : 2,
});

export const getButtonSkeletonStyles = () => ({
  borderRadius: 2,
});
