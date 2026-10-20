import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import CongratulationsCard from '@/components/molecules/CongratulationsCard/CongratulationsCard';

describe('CongratulationsCard', () => {
  it('renders the title, description, highlight text, and children', () => {
    render(
      <ThemeProvider theme={theme}>
        <CongratulationsCard
          title="Congratulations you are ready to start!"
          description="You are approved for funding. We are ready to advance you upto "
          highlightText="$8.3M"
          backgroundImage="bg.svg"
        >
          <button type="button">Learn more</button>
        </CongratulationsCard>
      </ThemeProvider>,
    );

    expect(screen.getByText('Congratulations you are ready to start!')).toBeInTheDocument();
    expect(screen.getByText(/You are approved for funding/)).toBeInTheDocument();
    expect(screen.getByText('$8.3M')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
  });

  it('omits the highlight span when highlightText is not provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <CongratulationsCard
          title="Congratulations you are ready to start!"
          description="You are approved for funding."
          backgroundImage="bg.svg"
        >
          <button type="button">Learn more</button>
        </CongratulationsCard>
      </ThemeProvider>,
    );

    expect(screen.queryByText('$8.3M')).not.toBeInTheDocument();
  });
});
