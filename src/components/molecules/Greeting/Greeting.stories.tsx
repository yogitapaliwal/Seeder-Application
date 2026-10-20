import type { Meta, StoryObj } from '@storybook/react';
import Greeting from '@/components/molecules/Greeting/Greeting';

const meta: Meta<typeof Greeting> = {
  title: 'Molecules/Greeting',
  component: Greeting,
  tags: ['autodocs'],
  argTypes: {
    // Explicit control type: never set in any story's args, and Storybook
    // can't reliably infer a boolean control with no sample value.
    showWaveEmoji: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Greeting>;

export const Default: Story = {
  args: {
    title: 'Good afternoon',
    date: 'Tuesday, 14 February 2023',
  },
};

export const WithWaveEmoji: Story = {
  args: {
    title: 'Good afternoon',
    date: 'Tuesday, 14 February 2023',
    showWaveEmoji: true,
  },
};
