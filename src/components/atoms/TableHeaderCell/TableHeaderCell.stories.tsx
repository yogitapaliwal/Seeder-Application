import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import Icon from '@/components/atoms/Icon/Icon';
import TableHeaderCell from '@/components/atoms/TableHeaderCell/TableHeaderCell';

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Atoms/TableHeaderCell',
  component: TableHeaderCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Table header cell supporting three variants: `text` (label only), `text-icon` (label + icon, e.g. sort indicator), and `icon` (icon only, e.g. select-all checkbox). The required props differ per variant — see the individual stories below.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'text-icon', 'icon'],
      description:
        "Determines which of `label` / `icon` are required. Switching this in Controls may show irrelevant fields since the panel can't enforce the discriminated union at runtime — refer to each story below for valid combinations.",
    },
    label: {
      control: 'text',
      description: 'Header text. Required for `text` and `text-icon` variants, not used by `icon`.',
    },
    icon: {
      control: false,
      description:
        'Icon element. Required for `text-icon` and `icon` variants, not used by `text`.',
    },
    width: {
      control: 'text',
      description: 'Optional column width (number in px, or any valid CSS width string).',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler, e.g. for sortable columns.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableHeaderCell>;

export const Text: Story = {
  args: {
    variant: 'text',
    label: 'Status',
  },
};

export const TextWithIcon: Story = {
  args: {
    variant: 'text-icon',
    label: 'Name',
    icon: <Icon name="sort" size={20} />,
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    icon: <Icon name="no-tick-square" size={20} />,
  },
};

export const WithFixedWidth: Story = {
  args: {
    variant: 'text',
    label: 'Created At',
    width: 160,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates a header cell with a fixed pixel width, useful for aligning columns in a table.',
      },
    },
  },
};

export const Sortable: Story = {
  args: {
    variant: 'text-icon',
    label: 'Amount',
    icon: <Icon name="sort" size={20} />,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A clickable sortable column header. The click handler is verified via the play function below.',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText('Amount');
    await userEvent.click(header);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
