import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';

import Typography from '@/components/atoms/Typography/Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Thin wrapper around MUI Typography using this theme's custom variants (`title`, `heading1-3`, `body1-2`, `caption`, `button`) defined in `theme/typography.ts`.",
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['title', 'heading1', 'heading2', 'heading3', 'body1', 'body2', 'caption', 'button'],
    },
    sx: {
      control: false,
      description: 'MUI sx style overrides.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'You have upto $709,546.00 available for a new cash advance',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="title">title — Good afternoon</Typography>
      <Typography variant="heading1">heading1 — Cash acceleration</Typography>
      <Typography variant="heading2">heading2 — Summary</Typography>
      <Typography variant="heading3">heading3 — Outstanding amount</Typography>
      <Typography variant="body1">body1 — You have upto $880,000.00 available</Typography>
      <Typography variant="body2">body2 — selected of $100,000.00</Typography>
      <Typography variant="caption">caption — $40,000.00 remaining</Typography>
      <Typography variant="button">button — New Cash Kick</Typography>
    </Box>
  ),
};
