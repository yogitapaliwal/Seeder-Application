import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import TableCellContent from '@/components/atoms/TableCellContent/TableCellContent';

describe('TableCellContent', () => {
  it('renders plain text for the "text" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableCellContent variant="text" text="Enterprise Plan" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Enterprise Plan')).toBeInTheDocument();
  });

  it('renders a title and subtitle for the "text-subtitle" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableCellContent variant="text-subtitle" title="Contract - Acme" subtitle="Monthly" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Contract - Acme')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
  });

  it('renders text with a leading icon for the "text-icon" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableCellContent variant="text-icon" text="Selected" icon={<span data-testid="icon" />} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders text with a trailing icon when iconPosition is "right"', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableCellContent
          variant="text-icon"
          text="Selected"
          icon={<span data-testid="icon" />}
          iconPosition="right"
        />
      </ThemeProvider>,
    );
    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders a Tag for the "tag" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableCellContent variant="tag" label="Active" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it.each([
    { name: 'progress', element: <TableCellContent variant="progress">{null}</TableCellContent> },
    {
      name: 'progress-percentage',
      element: <TableCellContent variant="progress-percentage">{null}</TableCellContent>,
    },
    { name: 'icon', element: <TableCellContent variant="icon" icon={<span />} /> },
    {
      name: 'sparkline',
      element: <TableCellContent variant="sparkline">{null}</TableCellContent>,
    },
  ])('renders nothing for the still-unimplemented "$name" variant', ({ element }) => {
    const { container } = render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
    expect(container).toBeEmptyDOMElement();
  });
});
