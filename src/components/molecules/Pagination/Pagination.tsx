import Icon from '@/components/atoms/Icon/Icon';
import Typography from '@/components/atoms/Typography/Typography';
import {
  NavigationButton,
  NavigationContainer,
  PageItem,
  PageItemsContainer,
  Container,
  getPageItemLabelStyles,
} from '@/components/molecules/Pagination/Pagination.styles';
import { PaginationProps } from '@/components/molecules/Pagination/Pagination.types';

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Container>
      <NavigationContainer>
        <NavigationButton disabled={currentPage === 1} onClick={handlePrevious}>
          <Icon name="arrow-left" size={12} />
        </NavigationButton>

        <PageItemsContainer>
          {pages.map((page) => {
            const isPageActive = page === currentPage;

            return (
              <PageItem key={page} active={isPageActive} onClick={() => onPageChange(page)}>
                <Typography variant="button" sx={getPageItemLabelStyles(isPageActive)}>
                  {page}
                </Typography>
              </PageItem>
            );
          })}
        </PageItemsContainer>

        <NavigationButton disabled={currentPage === totalPages} onClick={handleNext}>
          <Icon name="arrow-right" size={12} />
        </NavigationButton>
      </NavigationContainer>
    </Container>
  );
};

export default Pagination;
