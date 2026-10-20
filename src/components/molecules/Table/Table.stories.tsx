import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';

import Checkbox from '@/components/atoms/Checkbox';
import TableHeaderCell from '@/components/atoms/TableHeaderCell';
import TableCell from '@/components/atoms/TableCell';

import Table from '@/components/molecules/Table/Table';
import TableRow from '@/components/molecules/TableRow/TableRow';
import Icon from '@/components/atoms/Icon/Icon';

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table
      maxHeight={529}
      header={
        <>
          <TableHeaderCell
            variant="icon"
            width={44}
            icon={<Checkbox checked={false} indeterminate={false} onChange={() => {}} />}
          />

          <TableHeaderCell width={220} variant="text" label="Name" />

          <TableHeaderCell width={180} variant="text" label="Status" />

          <TableHeaderCell width={180} variant="text" label="Amount" />

          <TableHeaderCell
            width={80}
            variant="icon"
            icon={<Icon name="no-tick-square" size={20} />}
          />
        </>
      }
    >
      <TableRow selected={false}>
        <TableCell
          width={44}
          sx={{
            px: 0,
            justifyContent: 'center',
          }}
        >
          <Checkbox checked={false} onChange={() => {}} />
        </TableCell>

        <TableCell width={220}>
          <Typography>Enterprise Plan</Typography>
        </TableCell>

        <TableCell width={180}>
          <Typography>Pending</Typography>
        </TableCell>

        <TableCell width={180}>
          <Typography>$120.00</Typography>
        </TableCell>

        <TableCell width={80}>
          <Icon name="no-tick-square" size={20} />
        </TableCell>
      </TableRow>

      <TableRow selected>
        <TableCell
          width={44}
          sx={{
            px: 0,
            justifyContent: 'center',
          }}
        >
          <Checkbox checked onChange={() => {}} />
        </TableCell>

        <TableCell width={220}>
          <Typography>Startup Plan</Typography>
        </TableCell>

        <TableCell width={180}>
          <Typography>Paid</Typography>
        </TableCell>

        <TableCell width={180}>
          <Typography>$220.00</Typography>
        </TableCell>

        <TableCell width={80}>
          <Icon name="no-tick-square" size={20} />
        </TableCell>
      </TableRow>
    </Table>
  ),
};
