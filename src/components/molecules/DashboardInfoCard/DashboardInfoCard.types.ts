import { ReactNode } from 'react';

export interface DashboardInfoCardProps {
  header: ReactNode;
  title: string;
  value: number;
  showInfoIcon?: boolean;
  tag?: ReactNode;
}
