import type { Meta, StoryObj } from '@storybook/react';
import TitleBar from '@/components/molecules/TitleBar/TitleBar';
import Greeting from '@/components/molecules/Greeting';
import Avatar from '@/components/atoms/Avatar';

const meta: Meta<typeof TitleBar> = {
  title: 'Molecules/TitleBar',
  component: TitleBar,
  tags: ['autodocs'],
  argTypes: {
    greeting: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Greeting element rendered on the left (e.g. <Greeting />).',
    },
    avatar: {
      control: false,
      description: 'Avatar/menu element rendered on the right (e.g. <Avatar />).',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TitleBar>;

export const Default: Story = {
  args: {
    greeting: <Greeting title="Good afternoon" date="Tuesday, 14 February 2023" />,
    avatar: <Avatar size="large" src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />,
  },
};
