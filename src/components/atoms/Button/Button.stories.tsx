import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon/Icon';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Wraps MUI Button with this app's theme-driven variants/sizes. Click ripple is disabled by default for all instances.",
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'text', 'outlinedInverted'],
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
    },
    startIcon: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Icon rendered before the label.',
    },
    endIcon: {
      control: false,
      description: 'Icon rendered after the label.',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'New Cash Kick',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    children: 'Cancel',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    children: 'Reset',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'medium',
    startIcon: <Icon name="refresh" size={20} />,
    children: 'Sync Now',
  },
};

export const OutlinedInverted: Story = {
  args: {
    variant: 'outlinedInverted',
    size: 'large',
    children: 'Learn More',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    loading: true,
    children: 'Create Cash Kick',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    disabled: true,
    children: 'Request Credit Increase',
  },
};

export const Clickable: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Click me',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Click me' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
