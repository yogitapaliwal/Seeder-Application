import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import SummaryMetadata from '@/components/molecules/SummaryMetadata/SummaryMetadata';

describe('SummaryMetadata', () => {
  it('renders the label and value', () => {
    render(
      <ThemeProvider theme={theme}>
        <SummaryMetadata label="Term" value="12 months" />
      </ThemeProvider>,
    );

    expect(screen.getByText('Term')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
  });

  it('renders the secondary value when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <SummaryMetadata label="Rate %" value="$34,560.56" secondaryValue="(12.00%)" />
      </ThemeProvider>,
    );

    expect(screen.getByText('(12.00%)')).toBeInTheDocument();
  });

  it('omits the secondary value when not provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <SummaryMetadata label="Term" value="12 months" />
      </ThemeProvider>,
    );

    expect(screen.queryByText('(12.00%)')).not.toBeInTheDocument();
  });
});
