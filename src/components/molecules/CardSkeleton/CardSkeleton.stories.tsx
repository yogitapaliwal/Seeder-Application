import type { Meta, StoryObj } from '@storybook/react';

import CardSkeleton from '@/components/molecules/CardSkeleton/CardSkeleton';

const meta: Meta<typeof CardSkeleton> = {
  title: 'Molecules/CardSkeleton',
  component: CardSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Loading placeholder for card-shaped content (e.g. the "Launch a new Cash Kick" card while its data is loading).',
      },
    },
  },
  argTypes: {
    mediaShape: {
      control: 'select',
      options: ['square', 'circle', 'none'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardSkeleton>;

export const Default: Story = {
  args: {
    lines: 2,
    width: 340,
    showButton: true,
  },
};

export const WithBadgeAndMedia: Story = {
  args: {
    showBadge: true,
    mediaShape: 'circle',
    mediaSize: 64,
    lines: 3,
    width: 340,
    showButton: true,
  },
};

export const TextOnly: Story = {
  args: {
    lines: 2,
    width: 340,
  },
};
