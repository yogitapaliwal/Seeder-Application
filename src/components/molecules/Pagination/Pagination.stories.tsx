import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '@/components/molecules/Pagination/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const PaginationWithState = ({
  totalPages,
  initialPage,
}: {
  totalPages: number;
  initialPage: number;
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
  );
};

export const Default: Story = {
  render: () => <PaginationWithState totalPages={5} initialPage={1} />,
};

export const MiddlePage: Story = {
  render: () => <PaginationWithState totalPages={5} initialPage={3} />,
};

export const LastPage: Story = {
  render: () => <PaginationWithState totalPages={5} initialPage={5} />,
};
