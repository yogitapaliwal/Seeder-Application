import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import Greeting from '@/components/molecules/Greeting/Greeting';

describe('Greeting', () => {
  it('renders the title and date', () => {
    render(
      <ThemeProvider theme={theme}>
        <Greeting title="Good afternoon" date="Tuesday, 14 February 2023" />
      </ThemeProvider>,
    );

    expect(screen.getByText('Good afternoon')).toBeInTheDocument();
    expect(screen.getByText('Tuesday, 14 February 2023')).toBeInTheDocument();
  });

  it('does not render the wave emoji by default', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Greeting title="Good afternoon" date="Tuesday, 14 February 2023" />
      </ThemeProvider>,
    );

    expect(container.textContent).not.toContain('👋');
  });

  it('renders the wave emoji when showWaveEmoji is true', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Greeting title="Good afternoon" date="Tuesday, 14 February 2023" showWaveEmoji />
      </ThemeProvider>,
    );

    expect(container.textContent).toContain('👋');
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Greeting
          title="Good afternoon"
          date="Tuesday, 14 February 2023"
          sx={[{ opacity: 1 }, { opacity: 0.5 }]}
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyle({ opacity: '0.5' });
  });
});
