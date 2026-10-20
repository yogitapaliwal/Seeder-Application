import type { Meta, StoryObj } from '@storybook/react';

import SummaryMetadata from '@/components/molecules/SummaryMetadata/SummaryMetadata';

const meta: Meta<typeof SummaryMetadata> = {
  title: 'Molecules/SummaryMetadata',
  component: SummaryMetadata,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SummaryMetadata>;

export const Default: Story = {
  args: {
    label: 'Term',
    value: '12 months',
  },
};

export const WithSecondaryValue: Story = {
  args: {
    label: 'Rate %',
    secondaryValue: '(12.00%)',
    value: '$34,560.56',
  },
};
