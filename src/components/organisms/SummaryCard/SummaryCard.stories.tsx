import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon/Icon';
import Slider from '@/components/atoms/Slider';

import SummaryCard from '@/components/organisms/SummaryCard/SummaryCard';
import AutoSelectSection from '@/components/molecules/AutoSelectSection';

const meta: Meta<typeof SummaryCard> = {
  title: 'Organisms/SummaryCard',
  component: SummaryCard,
  tags: ['autodocs'],
  argTypes: {
    infoIcon: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Info icon rendered next to the title (e.g. <Icon name="info-circle" />).',
    },
    autoSelect: {
      control: false,
      description: 'Optional <AutoSelectSection /> rendered between the top and bottom items.',
    },
    footer: {
      control: false,
      description: 'Action button rendered at the bottom of the card.',
    },
    topItems: {
      // Structured list data — Storybook's generic object-tree editor isn't
      // a meaningful way to edit this, so it's disabled and documented instead.
      control: false,
      description: 'Array of `{ id, label, value, secondaryValue? }` metadata rows.',
    },
    bottomItems: {
      control: false,
      description: 'Array of `{ id, label, value, secondaryValue? }` metadata rows.',
    },
    total: {
      control: false,
      description: "Bundled `{ label, value }` total row (kept together so they can't mismatch).",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SummaryCard>;

const bottomItems = [
  { id: 'payback', label: 'Pay back amount', value: '$170,454.55' },
  { id: 'rate', label: 'Rate %', secondaryValue: '(12%)', value: '$34,560.56' },
];

export const Default: Story = {
  args: {
    title: 'Summary',
    infoIcon: <Icon name="info-circle" size={16} />,
    topItems: [
      { id: 'term', label: 'Term', value: '12 months' },
      { id: 'selectedContracts', label: 'Selected contracts', value: '3' },
    ],
    bottomItems,
    total: { label: 'Total Payout', value: '$253,442.50' },
    footer: (
      <Button variant="primary" size="large" fullWidth>
        Review Your Credit
      </Button>
    ),
  },
};

export const WithAutoSelect: Story = {
  args: {
    title: 'Summary',
    infoIcon: <Icon name="info-circle" size={16} />,
    autoSelect: (
      <AutoSelectSection
        title="Slide to autoselect"
        slider={<Slider value={60} min={0} max={100} onChange={() => {}} />}
        selectedAmount="$60,000.00"
        totalAmount="$100,000.00"
        remainingAmount="$40,000.00"
        isRemainingZero={false}
        isResetBtnDisabled={false}
        onReset={() => {}}
      />
    ),
    bottomItems,
    total: { label: 'Total Payout', value: '$253,442.50' },
    footer: (
      <Button variant="primary" size="large" fullWidth>
        Review Your Credit
      </Button>
    ),
  },
};
