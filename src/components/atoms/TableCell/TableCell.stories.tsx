import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@mui/material/Typography';

import TableCell from '@/components/atoms/TableCell/TableCell';

const meta: Meta<typeof TableCell> = {
  title: 'Atoms/TableCell',
  component: TableCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#4e23cf',
        },
      ],
    },
  },
  argTypes: {
    sx: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableCell>;

export const Default: Story = {
  args: {
    width: 200,
    children: (
      <Typography
        sx={{
          color: 'surface.elevation0',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Enterprise $300 - MRR - Monthly
      </Typography>
    ),
  },
};
