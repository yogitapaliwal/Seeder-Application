import { ReactNode } from 'react';

export interface AutoSelectSectionProps {
  title: string;
  resetLabel?: string;
  onReset?: () => void;
  slider: ReactNode;
  selectedAmount: string;
  totalAmount: string;
  remainingAmount: string;
  isRemainingZero: boolean;
  isResetBtnDisabled: boolean;
  infoTooltip?: ReactNode;
}
