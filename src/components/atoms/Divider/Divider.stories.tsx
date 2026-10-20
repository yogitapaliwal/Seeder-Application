import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';

import Divider from '@/components/atoms/Divider/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ width: 300 }}>
      <Divider {...args} aria-hidden="true" />
    </Box>
  ),
  args: {
    color: 'border.primary',
  },
};
