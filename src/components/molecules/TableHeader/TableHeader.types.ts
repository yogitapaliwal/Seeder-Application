import { ReactNode } from 'react';

export interface TableHeaderColumn {
  id: string;
  content: ReactNode;
}

export interface TableHeaderProps {
  columns: TableHeaderColumn[];
}
