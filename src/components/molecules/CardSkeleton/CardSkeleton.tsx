import { useMemo } from 'react';
import Skeleton from '@/components/atoms/Skeleton';
import {
  StyledCardRoot,
  StyledBadgeRow,
  StyledMediaWrapper,
  StyledLinesStack,
  getBadgeSkeletonStyles,
  getButtonSkeletonStyles,
  getMediaSkeletonStyles,
} from '@/components/molecules/CardSkeleton/CardSkeleton.styles';
import { CardSkeletonProps } from '@/components/molecules/CardSkeleton/CardSkeleton.types';

const CardSkeleton = ({
  showBadge = false,
  mediaShape = 'none',
  mediaSize = 48,
  lines = 2,
  showButton = false,
  sx,
  width,
  height,
}: CardSkeletonProps) => {
  const lineKeys = useMemo(() => Array.from({ length: lines }, () => crypto.randomUUID()), [lines]);

  return (
    <StyledCardRoot width={width} height={height} sx={sx}>
      {showBadge && (
        <StyledBadgeRow>
          <Skeleton width={90} height={24} sx={getBadgeSkeletonStyles()} />
        </StyledBadgeRow>
      )}

      {mediaShape !== 'none' && (
        <StyledMediaWrapper>
          <Skeleton width={mediaSize} height={mediaSize} sx={getMediaSkeletonStyles(mediaShape)} />
        </StyledMediaWrapper>
      )}

      <StyledLinesStack spacing={1} hasButton={showButton}>
        {lineKeys.map((key, i) => (
          <Skeleton
            key={key}
            width={i === lines - 1 ? '50%' : '90%'}
            height={i === lines - 1 ? 28 : 16}
          />
        ))}
      </StyledLinesStack>

      {showButton && <Skeleton width="100%" height={44} sx={getButtonSkeletonStyles()} />}
    </StyledCardRoot>
  );
};

export default CardSkeleton;
