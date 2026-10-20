import { StyledSkeleton } from '@/components/atoms/Skeleton/Skeleton.styles';
import { SkeletonProps } from '@/components/atoms/Skeleton/Skeleton.types';

const Skeleton = ({ width = '100%', height = 20, sx }: SkeletonProps) => {
  return (
    <StyledSkeleton variant="rounded" animation="wave" width={width} height={height} sx={sx} />
  );
};

export default Skeleton;
