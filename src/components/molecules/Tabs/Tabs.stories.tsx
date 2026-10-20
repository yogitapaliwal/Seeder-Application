import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tabs from '@/components/molecules/Tabs/Tabs';
import { TabItem } from '@/components/molecules/Tabs/Tabs.types';

const sampleTabs: TabItem[] = [
  { label: 'Default', value: 'default' },
  { label: 'Active', value: 'active' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const TabsWithState = (args: { tabs: TabItem[]; initialActiveTab: string }) => {
  const [activeTab, setActiveTab] = useState(args.initialActiveTab);

  return <Tabs tabs={args.tabs} activeTab={activeTab} onChange={setActiveTab} />;
};

export const Default: Story = {
  render: () => <TabsWithState tabs={sampleTabs} initialActiveTab="default" />,
};

export const ActiveSecondTab: Story = {
  render: () => <TabsWithState tabs={sampleTabs} initialActiveTab="active" />,
};

export const ThreeTabs: Story = {
  render: () => (
    <TabsWithState
      tabs={[
        { label: 'Overview', value: 'overview' },
        { label: 'Contracts', value: 'contracts' },
        { label: 'History', value: 'history' },
      ]}
      initialActiveTab="overview"
    />
  ),
};
