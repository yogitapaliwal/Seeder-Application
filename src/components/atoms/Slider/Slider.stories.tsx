import type { Meta, StoryObj } from '@storybook/react';

import Slider from '@/components/atoms/Slider/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wraps MUI Slider with app-specific `disabled`/`warning` styling. Used inside `AutoSelectSection` to drive the auto-select amount.',
      },
    },
  },
  args: {
    value: 60,
    min: 0,
    max: 100,
    onChange: () => {},
  },
  argTypes: {
    disabled: { control: 'boolean' },
    warning: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Warning: Story = {
  args: {
    value: 95,
    warning: true,
  },
};
