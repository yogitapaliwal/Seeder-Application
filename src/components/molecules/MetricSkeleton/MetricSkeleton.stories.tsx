import type { Meta, StoryObj } from '@storybook/react';

import MetricSkeleton from '@/components/molecules/MetricSkeleton/MetricSkeleton';

const meta: Meta<typeof MetricSkeleton> = {
  title: 'Molecules/MetricSkeleton',
  component: MetricSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Loading placeholder standing in for `CashAccelerationCard`'s metric tiles while their data is loading.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MetricSkeleton>;

export const Default: Story = {
  args: {
    count: 3,
  },
};

export const SingleMetric: Story = {
  args: {
    count: 1,
  },
};
