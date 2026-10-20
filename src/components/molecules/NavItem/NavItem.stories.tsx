import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import NavItem from '@/components/molecules/NavItem/NavItem';
import Icon from '@/components/atoms/Icon/Icon';

const meta: Meta<typeof NavItem> = {
  title: 'Molecules/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  argTypes: {
    leadingIcon: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Icon rendered before the label (e.g. <Icon />).',
    },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/home']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const Active: Story = {
  args: {
    label: 'Home',
    to: '/home',
    leadingIcon: <Icon name="home" size={16} />,
  },
};

export const Inactive: Story = {
  args: {
    label: 'Cash Acceleration',
    to: '/cash-acceleration',
    leadingIcon: <Icon name="cash-acceleration" size={16} />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Home',
    to: '/home',
    disabled: true,
    leadingIcon: <Icon name="home" size={16} />,
  },
};

export const WithoutIcon: Story = {
  args: {
    label: 'Home',
    to: '/home',
  },
};

export const ActionButton: Story = {
  args: {
    label: 'Log out',
    onClick: () => {},
    leadingIcon: <Icon name="arrow-right" size={16} />,
  },
};
