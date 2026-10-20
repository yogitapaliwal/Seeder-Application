import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Icon, { IconName } from '@/components/atoms/Icon/Icon';

const ICON_NAMES: IconName[] = [
  'logo',
  'home',
  'cash-acceleration',
  'flash',
  'sort',
  'no-tick-square',
  'info-circle',
  'arrow-right',
  'arrow-left',
  'arrow-bottom',
  'calendar',
  'percentage-square',
  'receipt-text',
  'document',
  'refresh',
  'close',
  'cheque',
  'coin-bag',
  'warning',
  'finance-planning',
  'back-btn',
  'review-gif',
];

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Renders an icon by name. Single-tone glyphs are inlined as SVG components (colorable via the `color` prop, defaults to `currentColor`); multi-color/fixed-palette assets (`logo`, `cheque`, `coin-bag`, `warning`, `finance-planning`) and `review-gif` render as plain `<img>` and ignore `color`.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'cash-acceleration',
    size: 40,
    color: '#CFC8FF',
  },
};

export const AllIcons: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 700 }}>
      {ICON_NAMES.map((name) => (
        <Box
          key={name}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            width: 96,
          }}
        >
          <Icon name={name} size={32} color="#E8E7F0" />
          <Typography sx={{ fontSize: 11, color: '#A5A5A6', textAlign: 'center' }}>
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};
