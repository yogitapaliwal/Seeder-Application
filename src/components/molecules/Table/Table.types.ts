import { ReactNode } from 'react';

export interface TableProps {
  header: ReactNode;
  children: ReactNode;
  maxHeight?: number | string;
  maxWidth?: number | string;
}
