import type { Meta, StoryObj } from '@storybook/react';

import ContractsEmptyState from '@/components/molecules/ContractsEmptyState/ContractsEmptyState';

const meta: Meta<typeof ContractsEmptyState> = {
  title: 'Molecules/ContractsEmptyState',
  component: ContractsEmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ContractsEmptyState>;

export const Empty: Story = {
  args: {
    variant: 'empty',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    onRetry: () => {},
  },
};
