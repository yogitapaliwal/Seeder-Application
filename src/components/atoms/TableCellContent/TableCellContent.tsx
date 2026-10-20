import TextValue from '@/components/atoms/TableCellContent/variants/TextValue';

import { TableCellContentProps } from '@/components/atoms/TableCellContent/TableCellContent.types';
import TextSubtitleValue from '@/components/atoms/TableCellContent/variants/TextSubtitleValue/TextSubtitleValue';
import TextIconValue from '@/components/atoms/TableCellContent/variants/TextIconValue/TextIconValue';
import Tag from '@/components/atoms/Tag/Tag';

const variantMap = {
  text: TextValue,
  'text-subtitle': TextSubtitleValue,
  'text-icon': TextIconValue,
  tag: Tag,
  progress: () => null,
  'progress-percentage': () => null,
  icon: () => null,
  sparkline: () => null,
} as const;

const TableCellContent = (props: TableCellContentProps) => {
  const Component = variantMap[props.variant];

  return <Component {...(props as never)} />;
};

export default TableCellContent;
