import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import Logo from '@/components/molecules/Logo/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Molecules/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    text: 'Seeder',
  },
};

export const Clickable: Story = {
  args: {
    text: 'Seeder',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const logo = canvas.getByText('Seeder');
    await userEvent.click(logo);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
