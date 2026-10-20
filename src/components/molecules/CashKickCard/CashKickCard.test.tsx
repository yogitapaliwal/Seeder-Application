import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import CashKickCard from '@/components/molecules/CashKickCard/CashKickCard';

describe('CashKickCard', () => {
  it('renders the title, description (split around the highlight), and button', () => {
    render(
      <ThemeProvider theme={theme}>
        <CashKickCard
          title="Launch a new Cash Kick"
          description="You have upto $880,000.00 available for a new cash advance"
          highlightText="$880,000.00"
          button={<button type="button">New Cash Kick</button>}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Launch a new Cash Kick')).toBeInTheDocument();
    expect(screen.getByText('$880,000.00')).toBeInTheDocument();
    expect(screen.getByText(/You have upto/)).toBeInTheDocument();
    expect(screen.getByText(/available for a new cash advance/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New Cash Kick' })).toBeInTheDocument();
  });
});
