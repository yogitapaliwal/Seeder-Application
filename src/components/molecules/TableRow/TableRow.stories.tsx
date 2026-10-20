import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';

import TableRow from '@/components/molecules/TableRow/TableRow';
import TableCell from '@/components/atoms/TableCell';

const meta: Meta<typeof TableRow> = {
  title: 'Molecules/TableRow',
  component: TableRow,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TableRow>;

export const Default: Story = {
  render: () => (
    <TableRow>
      <TableCell width={220}>
        <Typography>Enterprise Plan</Typography>
      </TableCell>

      <TableCell width={260}>
        <Typography>Monthly</Typography>
      </TableCell>

      <TableCell width={180}>
        <Typography>$120.00</Typography>
      </TableCell>
    </TableRow>
  ),
};
