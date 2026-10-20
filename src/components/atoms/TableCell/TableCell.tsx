import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

export interface TableCellProps {
  children: ReactNode;
  width: number;
  sx?: SxProps<Theme>;
}

const TableCell = ({ children, width, sx }: TableCellProps) => {
  return (
    <Box
      sx={[
        {
          width,
          minHeight: 62,
          px: 2.5,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          flexShrink: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default TableCell;
