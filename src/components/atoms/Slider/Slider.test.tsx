import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import Slider from '@/components/atoms/Slider/Slider';

describe('Slider', () => {
  it('renders a slider with the given value/min/max', () => {
    render(
      <ThemeProvider theme={theme}>
        <Slider value={60} min={0} max={100} onChange={jest.fn()} />
      </ThemeProvider>,
    );
    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('aria-valuenow', '60');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('is disabled when disabled is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Slider value={60} min={0} max={100} onChange={jest.fn()} disabled />
      </ThemeProvider>,
    );
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('renders with the warning style variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Slider value={60} min={0} max={100} onChange={jest.fn()} warning />
      </ThemeProvider>,
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
