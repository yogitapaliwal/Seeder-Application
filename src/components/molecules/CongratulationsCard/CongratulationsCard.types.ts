import { ReactNode } from 'react';

export interface CongratulationsCardProps {
  title: string;
  description: string;
  highlightText?: string;
  backgroundImage: string;
  children?: ReactNode;
}
