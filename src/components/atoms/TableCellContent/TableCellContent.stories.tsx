import type { Meta, StoryObj } from '@storybook/react';

import TableCellContent from '@/components/atoms/TableCellContent/TableCellContent';
import Icon from '@/components/atoms/Icon/Icon';

const meta: Meta<typeof TableCellContent> = {
  title: 'Atoms/TableCellContent',
  component: TableCellContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Variant-dispatch cell renderer for `Table` rows: picks a sub-component from a `variantMap` keyed by `variant`. Only `text`, `text-subtitle`, and `text-icon` are implemented below — `tag`, `progress`, `progress-percentage`, `icon`, and `sparkline` are still stubbed in the component (some return `null`, `tag` has a known bug) and are intentionally not demonstrated here.',
      },
    },
  },
  argTypes: {
    icon: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Icon element, used by the `text-icon` variant.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableCellContent>;

export const Text: Story = {
  args: {
    variant: 'text',
    text: 'Enterprise Plan',
  },
};

export const TextWithColor: Story = {
  args: {
    variant: 'text',
    text: 'Overdue',
    color: 'error.main',
  },
};

export const TextSubtitle: Story = {
  args: {
    variant: 'text-subtitle',
    title: 'Contract - Acme Corp',
    subtitle: 'Monthly',
  },
};

export const TextIcon: Story = {
  args: {
    variant: 'text-icon',
    text: 'Selected',
    icon: <Icon name="no-tick-square" size={16} />,
    iconPosition: 'left',
  },
};
