import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import TableRow from '@/components/molecules/TableRow/TableRow';

describe('TableRow', () => {
  it('renders its children', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableRow>
          <span>Cell content</span>
        </TableRow>
      </ThemeProvider>,
    );

    expect(screen.getByText('Cell content')).toBeInTheDocument();
  });

  it('renders without error when selected', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableRow selected>
          <span>Cell content</span>
        </TableRow>
      </ThemeProvider>,
    );

    expect(screen.getByText('Cell content')).toBeInTheDocument();
  });
});
