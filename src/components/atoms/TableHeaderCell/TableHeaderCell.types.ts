import { ReactNode } from 'react';

export type TableHeaderCellVariant = 'text' | 'text-icon' | 'icon';

interface BaseProps {
  onClick?: () => void;
}

type TextHeaderProps = BaseProps & {
  variant: 'text';
  label: string;
  width?: number | string;
};

type TextIconHeaderProps = BaseProps & {
  variant: 'text-icon';
  label: string;
  icon: ReactNode;
  width?: number | string;
};

type IconHeaderProps = BaseProps & {
  variant: 'icon';
  icon: ReactNode;
  width?: number | string;
};
export type TableHeaderCellProps = TextHeaderProps | TextIconHeaderProps | IconHeaderProps;
