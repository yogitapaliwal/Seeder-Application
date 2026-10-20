export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PageItemProps {
  active?: boolean;
}

export interface NavigationButtonProps {
  disabled?: boolean;
}
