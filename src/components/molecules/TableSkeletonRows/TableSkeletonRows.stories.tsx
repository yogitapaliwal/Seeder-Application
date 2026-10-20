import type { Meta, StoryObj } from '@storybook/react';

import TableSkeletonRows from '@/components/molecules/TableSkeletonRows/TableSkeletonRows';
import Table from '@/components/molecules/Table/Table';
import TableHeaderCell from '@/components/atoms/TableHeaderCell';

const COLUMN_WIDTHS = [220, 180, 180];

const meta: Meta<typeof TableSkeletonRows> = {
  title: 'Molecules/TableSkeletonRows',
  component: TableSkeletonRows,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Loading placeholder rows rendered inside a `Table` while its data is loading. Renders one `<TableRow>` of skeleton cells per `columnWidths` entry, repeated `rowCount` times.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableSkeletonRows>;

export const Default: Story = {
  render: (args) => (
    <Table
      maxHeight={300}
      header={
        <>
          <TableHeaderCell width={220} variant="text" label="Name" />
          <TableHeaderCell width={180} variant="text" label="Status" />
          <TableHeaderCell width={180} variant="text" label="Amount" />
        </>
      }
    >
      <TableSkeletonRows {...args} />
    </Table>
  ),
  args: {
    columnWidths: COLUMN_WIDTHS,
    rowCount: 5,
  },
};
