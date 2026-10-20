import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import SummaryCard from '@/components/organisms/SummaryCard/SummaryCard';

describe('SummaryCard', () => {
  it('renders the title (defaulting to "Summary") and the top/bottom metadata items', () => {
    render(
      <ThemeProvider theme={theme}>
        <SummaryCard
          topItems={[{ id: 'term', label: 'Term', value: '12 months' }]}
          bottomItems={[{ id: 'payback', label: 'Pay back amount', value: '$170,454.55' }]}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Term')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
    expect(screen.getByText('Pay back amount')).toBeInTheDocument();
    expect(screen.getByText('$170,454.55')).toBeInTheDocument();
  });

  it('renders a custom title, the autoSelect slot, and the footer slot', () => {
    render(
      <ThemeProvider theme={theme}>
        <SummaryCard
          title="Custom summary"
          autoSelect={<div data-testid="auto-select" />}
          footer={<button type="button">Review Your Credit</button>}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Custom summary')).toBeInTheDocument();
    expect(screen.getByTestId('auto-select')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Review Your Credit' })).toBeInTheDocument();
  });

  it('renders the total row only when both label and value are provided', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <SummaryCard total={{ label: 'Total Payout', value: '$253,442.50' }} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Total Payout')).toBeInTheDocument();
    expect(screen.getByText('$253,442.50')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <SummaryCard />
      </ThemeProvider>,
    );
    expect(screen.queryByText('Total Payout')).not.toBeInTheDocument();
  });
});
