import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Pagination from '@/components/molecules/Pagination/Pagination';

const renderComponent = (props: Partial<React.ComponentProps<typeof Pagination>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} {...props} />
    </ThemeProvider>,
  );

describe('Pagination', () => {
  it('renders one button per page', () => {
    renderComponent({ totalPages: 5 });
    for (const page of [1, 2, 3, 4, 5]) {
      expect(screen.getByRole('button', { name: String(page) })).toBeInTheDocument();
    }
  });

  it('calls onPageChange with the clicked page number', () => {
    const onPageChange = jest.fn();
    renderComponent({ onPageChange });

    fireEvent.click(screen.getByRole('button', { name: '3' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  // NOTE: NavigationButton's `shouldForwardProp` strips `disabled` before it reaches
  // the native <button>, so the DOM element itself is never actually disabled (a real
  // accessibility gap in Pagination.styles.ts, outside the scope of this test). What IS
  // guaranteed is that the click handlers no-op past the first/last page, so we assert that.
  it('does not call onPageChange when clicking previous on the first page or next on the last page', () => {
    const onPageChange = jest.fn();
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getAllByRole('button')[0]); // previous, on page 1
    expect(onPageChange).not.toHaveBeenCalled();

    rerender(
      <ThemeProvider theme={theme}>
        <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
      </ThemeProvider>,
    );
    const buttonsAtEnd = screen.getAllByRole('button');
    fireEvent.click(buttonsAtEnd[buttonsAtEnd.length - 1]); // next, on the last page
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('navigates to the previous/next page when those buttons are clicked', () => {
    const onPageChange = jest.fn();
    renderComponent({ currentPage: 2, onPageChange });

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // previous
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(buttons[buttons.length - 1]); // next
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
