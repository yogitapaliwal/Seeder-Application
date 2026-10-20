import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 16.3,
    max: 100,
  },
};

export const HalfFilled: Story = {
  args: {
    value: 50,
    max: 100,
  },
};

export const FullFilled: Story = {
  args: {
    value: 100,
    max: 100,
  },
};

export const CustomMax: Story = {
  args: {
    value: 141,
    max: 200,
  },
};
