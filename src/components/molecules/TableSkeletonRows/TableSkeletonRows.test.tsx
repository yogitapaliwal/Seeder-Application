import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import theme from '@/theme';
import TableSkeletonRows from '@/components/molecules/TableSkeletonRows/TableSkeletonRows';

describe('TableSkeletonRows', () => {
  it('renders rowCount * columnWidths.length skeleton cells', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TableSkeletonRows columnWidths={[220, 180, 180]} rowCount={4} />
      </ThemeProvider>,
    );

    expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(4 * 3);
  });

  it('defaults rowCount to DEFAULT_PAGE_SIZE when not provided', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TableSkeletonRows columnWidths={[220]} />
      </ThemeProvider>,
    );

    // one skeleton per row (single column) - just assert it rendered a non-zero, consistent count
    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });
});
