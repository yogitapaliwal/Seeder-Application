import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import Table from '@/components/molecules/Table/Table';

describe('Table', () => {
  it('renders the header and body content', () => {
    render(
      <ThemeProvider theme={theme}>
        <Table header={<div>Header row</div>}>
          <div>Row content</div>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByText('Header row')).toBeInTheDocument();
    expect(screen.getByText('Row content')).toBeInTheDocument();
  });

  it('applies maxHeight to the scroll container when provided', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Table header={<div>Header row</div>} maxHeight={400}>
          <div>Row content</div>
        </Table>
      </ThemeProvider>,
    );

    const scrollContainer = container.firstChild?.firstChild;
    expect(scrollContainer).toHaveStyle({ maxHeight: '400px' });
  });
});
