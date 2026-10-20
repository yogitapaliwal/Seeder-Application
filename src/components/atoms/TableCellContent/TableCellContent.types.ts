import { ReactNode } from 'react';

export type TableCellContentVariant =
  | 'text'
  | 'text-subtitle'
  | 'text-icon'
  | 'tag'
  | 'progress'
  | 'progress-percentage'
  | 'icon'
  | 'sparkline';

interface BaseProps {
  variant: TableCellContentVariant;
}

export interface TextValueProps extends BaseProps {
  variant: 'text';
  text: string | number;
  color?: string;
}

export interface TextSubtitleValueProps extends BaseProps {
  variant: 'text-subtitle';

  title: string | number;
  subtitle: string | number;

  titleColor?: string;
  subtitleColor?: string;
}

export interface TagValueProps extends BaseProps {
  variant: 'tag';
  label: string;
}

export interface ProgressValueProps extends BaseProps {
  variant: 'progress';
  children: ReactNode;
}

export interface ProgressPercentageValueProps extends BaseProps {
  variant: 'progress-percentage';
  children: ReactNode;
}

export interface IconValueProps extends BaseProps {
  variant: 'icon';
  icon: ReactNode;
}

export interface SparklineValueProps extends BaseProps {
  variant: 'sparkline';
  children: ReactNode;
}

export interface TextIconValueProps extends BaseProps {
  variant: 'text-icon';

  text: string;
  icon: React.ReactNode;

  iconPosition?: 'left' | 'right';

  textColor?: string;
}

export type TableCellContentProps =
  | TextValueProps
  | TextSubtitleValueProps
  | TextIconValueProps
  | TagValueProps
  | ProgressValueProps
  | ProgressPercentageValueProps
  | IconValueProps
  | SparklineValueProps;
