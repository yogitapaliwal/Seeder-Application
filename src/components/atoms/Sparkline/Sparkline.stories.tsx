import type { Meta, StoryObj } from '@storybook/react';

import Sparkline from '@/components/atoms/Sparkline/Sparkline';

const meta: Meta<typeof Sparkline> = {
  title: 'Atoms/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Sparkline>;

export const VariantOne: Story = {
  args: {
    variant: 'one',
  },
};

export const VariantTwo: Story = {
  args: {
    variant: 'two',
  },
};

export const VariantThree: Story = {
  args: {
    variant: 'three',
  },
};
