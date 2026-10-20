import { ReactNode } from 'react';

export interface SummaryMetadataItem {
  id: string;
  label: string;
  value: string;
  secondaryValue?: string;
}

export interface SummaryTotal {
  label: string;
  value: string;
}

export interface SummaryCardProps {
  title?: string;
  topItems?: SummaryMetadataItem[];
  autoSelect?: ReactNode;
  bottomItems?: SummaryMetadataItem[];
  total?: SummaryTotal; // bundled — can't pass mismatched label/value
  footer?: ReactNode;
  infoIcon?: ReactNode;
}
