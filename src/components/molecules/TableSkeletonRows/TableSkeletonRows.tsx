import { useMemo } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import Skeleton from '@/components/atoms/Skeleton';
import TableCell from '@/components/atoms/TableCell';
import TableRow from '@/components/molecules/TableRow/TableRow';
import { TableSkeletonRowsProps } from '@/components/molecules/TableSkeletonRows/TableSkeletonRows.types';

const TableSkeletonRows = ({
  columnWidths,
  rowCount = DEFAULT_PAGE_SIZE,
  skeletonWidth = 78,
  skeletonHeight = 25,
}: TableSkeletonRowsProps) => {
  const rowKeys = useMemo(
    () => Array.from({ length: rowCount }, () => crypto.randomUUID()),
    [rowCount],
  );
  const columnKeys = useMemo(() => columnWidths.map(() => crypto.randomUUID()), [columnWidths]);

  return (
    <>
      {rowKeys.map((rowKey) => (
        <TableRow key={rowKey}>
          {columnWidths.map((width, columnIndex) => (
            <TableCell key={columnKeys[columnIndex]} width={width}>
              <Skeleton width={skeletonWidth} height={skeletonHeight} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeletonRows;
