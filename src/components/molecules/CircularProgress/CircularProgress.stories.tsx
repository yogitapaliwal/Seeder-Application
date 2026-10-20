import type { Meta, StoryObj } from '@storybook/react';

import CircularProgress from '@/components/molecules/CircularProgress/CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Molecules/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    thickness: { control: 'number' },
    showLabel: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: {
    value: 0,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const WithoutLabel: Story = {
  args: {
    value: 75,
    showLabel: false,
  },
};
