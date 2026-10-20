import type { Meta, StoryObj } from '@storybook/react';
import NavTabs from '@/components/molecules/NavTabs/NavTabs';
import type { NavTabsProps } from '@/components/molecules/NavTabs/NavTabs.types';

const meta: Meta<typeof NavTabs> = {
  title: 'Molecules/NavTabs',
  component: NavTabs,
  tags: ['autodocs'],
  args: {
    label: 'My contracts',
    state: 'default',
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<NavTabsProps>;

export const Default: Story = {
  args: {
    label: 'My contracts',
    state: 'default',
  },
};

export const Active: Story = {
  args: {
    label: 'My contracts',
    state: 'active',
  },
};

export const Disabled: Story = {
  args: {
    label: 'My contracts',
    state: 'default',
    disabled: true,
  },
};
