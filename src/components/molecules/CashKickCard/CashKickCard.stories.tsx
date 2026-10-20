import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/atoms/Button/Button';
import CashKickCard from '@/components/molecules/CashKickCard/CashKickCard';

const meta: Meta<typeof CashKickCard> = {
  title: 'Molecules/CashKickCard',
  component: CashKickCard,
  tags: ['autodocs'],
  argTypes: {
    button: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Action button rendered at the bottom of the card.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CashKickCard>;

export const Default: Story = {
  args: {
    title: 'Launch a new Cash Kick',
    description: 'You have upto $880,000.00 available for a new cash advance',
    highlightText: '$880,000.00',
    button: (
      <Button variant="primary" size="large">
        New Cash Kick
      </Button>
    ),
  },
};
