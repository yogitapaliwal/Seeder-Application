import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import type { NavItemProps } from '@/components/molecules/NavItem';
import NavItem from '@/components/molecules/NavItem';
import Icon from '@/components/atoms/Icon/Icon';
import Logo from '@/components/molecules/Logo/Logo';

const navigationItems: NavItemProps[] = [
  {
    label: 'Home',
    to: '/home',
    leadingIcon: <Icon name="home" size={16} />,
  },
  {
    label: 'Cash Acceleration',
    to: '/cash-acceleration',
    leadingIcon: <Icon name="cash-acceleration" size={16} />,
  },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    logo: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Logo element rendered at the top of the sidebar.',
    },
    items: {
      control: false,
      description: 'Nav items rendered in the sidebar body — each has a ReactNode leadingIcon.',
    },
    footer: {
      control: false,
      description: 'Element rendered at the bottom of the sidebar (e.g. <NavItem />).',
    },
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

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    logo: <Logo text="Seeder" />,
    items: navigationItems,
    footer: (
      <NavItem
        label="Watch how to"
        onClick={() => {}}
        leadingIcon={<Icon name="flash" size={16} />}
      />
    ),
  },
};
