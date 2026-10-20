import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import TableHeaderCell from '@/components/atoms/TableHeaderCell/TableHeaderCell';

describe('TableHeaderCell', () => {
  it('renders the label for the "text" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableHeaderCell variant="text" label="Status" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders the label and icon for the "text-icon" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableHeaderCell variant="text-icon" label="Name" icon={<span data-testid="icon" />} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders only the icon (no label) for the "icon" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableHeaderCell variant="icon" icon={<span data-testid="icon" />} />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked (e.g. for sortable columns)', () => {
    const onClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <TableHeaderCell variant="text" label="Amount" onClick={onClick} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Amount'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
