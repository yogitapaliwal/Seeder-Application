import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import CircularProgress from '@/components/molecules/CircularProgress/CircularProgress';

describe('CircularProgress', () => {
  it('renders the percentage label by default', () => {
    render(
      <ThemeProvider theme={theme}>
        <CircularProgress value={42} />
      </ThemeProvider>,
    );

    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('hides the label when showLabel is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <CircularProgress value={42} showLabel={false} />
      </ThemeProvider>,
    );

    expect(screen.queryByText('42%')).not.toBeInTheDocument();
  });

  it('passes value through to the underlying progress indicator', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CircularProgress value={75} />
      </ThemeProvider>,
    );

    const indicators = container.querySelectorAll('[role="progressbar"]');
    // track (fixed at 100) + indicator (actual value)
    expect(indicators).toHaveLength(2);
    expect(indicators[1]).toHaveAttribute('aria-valuenow', '75');
  });
});
