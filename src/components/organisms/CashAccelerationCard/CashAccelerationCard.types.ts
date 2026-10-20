import { ReactNode } from 'react';
import { IconName } from '@/components/atoms/Icon/Icon';

export interface CashAccelerationMetric {
  id: string;
  title: string;
  value: ReactNode;
  infoIcon?: boolean;
  iconName: IconName;
  iconColor?: string;
}

export interface CashAccelerationCardProps {
  items: CashAccelerationMetric[];
}
