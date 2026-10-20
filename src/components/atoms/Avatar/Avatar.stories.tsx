import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@/components/atoms/Avatar/Avatar';

const avatarImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays a user avatar with optional icon overlay, size, and variant support. Can be static or clickable via the optional `onClick` prop.',
      },
    },
  },
  argTypes: {
    src: {
      description: 'Image URL (required)',
    },
    alt: {
      description: 'Alt text for accessibility (required)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['avatar', 'avatarWithIcon'],
    },
    icon: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description:
        'Icon element rendered inside the avatar (e.g. <Icon />), used with the `avatarWithIcon` variant.',
    },
    sx: {
      control: false,
      description: 'MUI sx style overrides.',
    },
    onClick: {
      action: 'clicked',
      description:
        'Optional click handler. When omitted, the avatar renders as static (non-interactive).',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const baseArgs = {
  src: avatarImage,
  alt: 'Avatar',
  variant: 'avatar' as const,
};

export const Default: Story = {
  args: {
    ...baseArgs,
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    ...baseArgs,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    ...baseArgs,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    ...baseArgs,
    size: 'large',
  },
};

export const AvatarWithIcon: Story = {
  args: {
    ...baseArgs,
    size: 'large',
    variant: 'avatarWithIcon',
    icon: <KeyboardArrowDownIcon fontSize="small" />,
  },
};

export const Clickable: Story = {
  args: {
    ...baseArgs,
    size: 'large',
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive avatar with a click handler attached, verified via the play function below.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const avatarEl = canvas.getByRole('img');
    await userEvent.click(avatarEl);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
