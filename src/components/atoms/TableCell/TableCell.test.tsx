import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import TableCell from '@/components/atoms/TableCell/TableCell';

describe('TableCell', () => {
  it('renders its children with the given width', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TableCell width={200}>Enterprise Plan</TableCell>
      </ThemeProvider>,
    );

    expect(screen.getByText('Enterprise Plan')).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ width: '200px' });
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TableCell width={200} sx={[{ opacity: 1 }, { opacity: 0.5 }]}>
          Enterprise Plan
        </TableCell>
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyle({ opacity: '0.5' });
  });
});
