import type { Meta, StoryObj } from '@storybook/react';
import CashAccelerationCard from '@/components/organisms/CashAccelerationCard/CashAccelerationCard';

const meta: Meta<typeof CashAccelerationCard> = {
  title: 'Organisms/CashAccelerationCard',
  component: CashAccelerationCard,
  tags: ['autodocs'],
  argTypes: {
    items: {
      // Structured list data — Storybook's generic object-tree editor isn't
      // a meaningful way to edit this, so it's disabled and documented instead.
      control: false,
      description: 'Array of `{ id, title, value, iconName, iconColor?, infoIcon? }` metric cards.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CashAccelerationCard>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 'term',
        title: 'Term cap',
        value: '12 months',
        iconName: 'calendar',
        iconColor: '#CFC8FF',
        infoIcon: true,
      },
      {
        id: 'credit',
        title: 'Available credit',
        value: '$880.0k',
        iconName: 'document',
        iconColor: '#A0D7E7',
        infoIcon: true,
      },
      {
        id: 'interest',
        title: 'Max interest rate',
        value: '12%',
        iconName: 'percentage-square',
        iconColor: '#E5CB9B',
        infoIcon: true,
      },
    ],
  },
};
