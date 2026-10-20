import type { Meta, StoryObj } from '@storybook/react';

import Tag from '@/components/atoms/Tag/Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Paid',
    variant: 'default',
  },
};

export const Important: Story = {
  args: {
    label: 'Overdue',
    variant: 'important',
  },
};
