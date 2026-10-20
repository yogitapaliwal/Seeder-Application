import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';

import DashboardInfoCard from '@/components/molecules/DashboardInfoCard/DashboardInfoCard';

import Icon from '@/components/atoms/Icon/Icon';
import Tag from '@/components/atoms/Tag/Tag';
import CircularProgress from '@/components/molecules/CircularProgress';

const meta: Meta<typeof DashboardInfoCard> = {
  title: 'Molecules/DashboardInfoCard',
  component: DashboardInfoCard,
  tags: ['autodocs'],
  argTypes: {
    header: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Icon/illustration element rendered at the top of the card.',
    },
    tag: {
      control: false,
      description: 'Optional status pill rendered in the top-right corner (e.g. <Tag />).',
    },
    // Explicit control type: never set in any story's args, and Storybook
    // can't reliably infer a boolean control with no sample value.
    showInfoIcon: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof DashboardInfoCard>;

export const Payment: Story = {
  args: {
    header: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: '12px',
          backgroundColor: 'grey.100',
        }}
      >
        <Icon name="receipt-text" size={40} color="#E39AB2" />
      </Box>
    ),

    title: 'Due - May 03, 2021',

    value: 14204.55,

    tag: <Tag label="Due in 30 day(s)" variant="important" />,
  },
};

export const Outstanding: Story = {
  args: {
    header: <CircularProgress value={0} size={80} thickness={4} />,

    title: 'Outstanding amount',

    value: 170454.55,
  },
};
