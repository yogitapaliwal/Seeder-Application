import type { Meta, StoryObj } from '@storybook/react';
import CongratulationsCard from '@/components/molecules/CongratulationsCard/CongratulationsCard';
import Button from '@/components/atoms/Button/Button';
import cardBackground from '@/assets/images/congratulations-card.svg';

const meta: Meta<typeof CongratulationsCard> = {
  title: 'Molecules/CongratulationsCard',
  component: CongratulationsCard,
  tags: ['autodocs'],
  argTypes: {
    children: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Action button (or other content) rendered at the bottom of the card.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CongratulationsCard>;

export const Default: Story = {
  args: {
    title: 'Congratulations you are ready to start!',
    description: 'You are approved for funding. We are ready to advance you upto ',
    highlightText: '$8.3M',
    backgroundImage: cardBackground,
    children: <Button>Learn More</Button>,
  },
};
