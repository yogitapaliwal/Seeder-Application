import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/atoms/Icon/Icon';
import TableHeaderCell from '@/components/atoms/TableHeaderCell';
import TableHeader from '@/components/molecules/TableHeader/TableHeader';

const meta: Meta<typeof TableHeader> = {
  title: 'Molecules/TableHeader',
  component: TableHeader,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      // Each column's `content` is a ReactNode, which can't be meaningfully
      // edited via the object control, so it's disabled here and documented instead.
      control: false,
      description: 'Array of `{ id, content }` — content is a <TableHeaderCell />.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableHeader>;

export const Default: Story = {
  args: {
    columns: [
      {
        id: 'name',
        content: <TableHeaderCell label="Name" variant="text" />,
      },
      {
        id: 'status',
        content: <TableHeaderCell label="Status" variant="text" />,
      },
      {
        id: 'selected',
        content: <TableHeaderCell icon={<Icon name="no-tick-square" size={20} />} variant="icon" />,
      },
    ],
  },
};
