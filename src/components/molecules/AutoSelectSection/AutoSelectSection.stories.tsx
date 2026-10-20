import type { Meta, StoryObj } from '@storybook/react';

import AutoSelectSection from '@/components/molecules/AutoSelectSection';
import Slider from '@/components/atoms/Slider';

const meta: Meta<typeof AutoSelectSection> = {
  title: 'Molecules/AutoSelectSection',
  component: AutoSelectSection,
  tags: ['autodocs'],
  argTypes: {
    slider: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Slider element rendered between the header and the selected-amount summary.',
    },
    infoTooltip: {
      control: false,
      description: 'Optional tooltip/info icon rendered next to the title.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AutoSelectSection>;

export const Default: Story = {
  args: {
    title: 'Slide to autoselect',
    slider: <Slider value={60} min={0} max={100} onChange={() => {}} />,
    selectedAmount: '$60,000.00',
    totalAmount: '$100,000.00',
    remainingAmount: '$40,000.00',
    isRemainingZero: false,
    isResetBtnDisabled: false,
    onReset: () => {},
  },
};

export const FullySelected: Story = {
  args: {
    ...Default.args,
    slider: <Slider value={100} min={0} max={100} onChange={() => {}} />,
    selectedAmount: '$100,000.00',
    remainingAmount: '$0.00',
    isRemainingZero: true,
  },
};

export const ResetDisabled: Story = {
  args: {
    ...Default.args,
    slider: <Slider value={0} min={0} max={100} onChange={() => {}} />,
    selectedAmount: '$0.00',
    remainingAmount: '$100,000.00',
    isResetBtnDisabled: true,
  },
};
