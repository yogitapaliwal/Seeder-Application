import type { Meta, StoryObj } from '@storybook/react';

import EmptyState from '@/components/molecules/EmptyState/EmptyState';
import Icon from '@/components/atoms/Icon/Icon';

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Illustration rendered above the title (e.g. <Icon size={160} />).',
    },
    variant: {
      control: 'select',
      options: ['success', 'empty', 'error'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Empty: Story = {
  args: {
    variant: 'empty',
    icon: <Icon name="finance-planning" size={160} />,
    title: 'Connect your preferred payments or subscriptions platform to import contracts',
    onAction: () => {},
    actionLabel: 'Connect Now',
  },
};

export const NoPayments: Story = {
  args: {
    variant: 'empty',
    icon: <Icon name="cheque" size={160} />,
    title: 'You don’t have any Cash Kick',
    onAction: () => {},
    actionLabel: 'Launch a new cash kick',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    icon: <Icon name="warning" size={160} />,
    title: 'Oops! Failed to connect',
    subtitle: 'Please contact customer support if this problem persists',
    onAction: () => {},
    actionLabel: 'Retry',
  },
};
