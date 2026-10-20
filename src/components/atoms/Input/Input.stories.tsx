import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/atoms/Input/Input';
import Icon from '@/components/atoms/Icon/Icon';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: false,
      description: 'Label rendered above the field.',
    },
    startIcon: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Icon rendered inside the field, before the value.',
    },
    endIcon: {
      control: false,
      description: 'Icon rendered inside the field, after the value.',
    },
    infoIcon: {
      control: false,
      description: 'Icon rendered next to the label (e.g. a tooltip trigger).',
    },
    helperText: {
      control: false,
      description: 'Text rendered below the field.',
    },
    state: {
      control: 'select',
      options: ['default', 'active', 'filled'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Cash kick name',
    placeholder: 'Ex: marketing expenses',
  },
};

export const Filled: Story = {
  args: {
    label: 'Cash kick name',
    value: 'Marketing expenses',
    state: 'filled',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Cash kick name',
    placeholder: 'Ex: marketing expenses',
    helperText: 'Must be at least 3 characters.',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Search contracts',
    placeholder: 'Search…',
    startIcon: <Icon name="sort" size={16} />,
    infoIcon: <Icon name="info-circle" size={16} />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Cash kick name',
    value: 'Marketing expenses',
    disabled: true,
  },
};
