import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from '@/components/atoms/Skeleton/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Loading placeholder with a rounded shape and wave animation. Used as the building block for composite skeletons like `CardSkeleton`, `MetricSkeleton`, and `TableSkeletonRows`.',
      },
    },
  },
  argTypes: {
    sx: {
      control: false,
      description: 'MUI sx style overrides.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Circle: Story = {
  args: {
    width: 40,
    height: 40,
  },
};

export const FullWidth: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    width: '100%',
    height: 16,
  },
};
