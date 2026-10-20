import { useMemo } from 'react';
import Skeleton from '@/components/atoms/Skeleton';
import {
  Container,
  IconContainer,
  MetricPlaceholder,
  TitleRow,
} from '@/components/molecules/MetricSkeleton/Metricskeleton.styles';

import { MetricSkeletonProps } from '@/components/molecules/MetricSkeleton/MetricSkeleton.types';

const MetricSkeleton = ({ count = 3 }: MetricSkeletonProps) => {
  const metricKeys = useMemo(
    () => Array.from({ length: count }, () => crypto.randomUUID()),
    [count],
  );

  return (
    <Container>
      {metricKeys.map((key) => (
        <MetricPlaceholder key={key}>
          <IconContainer>
            <Skeleton width={40} height={40} />
          </IconContainer>

          <TitleRow>
            <Skeleton width={80} height={16} />
          </TitleRow>

          <Skeleton width={100} height={28} />
        </MetricPlaceholder>
      ))}
    </Container>
  );
};

export default MetricSkeleton;
