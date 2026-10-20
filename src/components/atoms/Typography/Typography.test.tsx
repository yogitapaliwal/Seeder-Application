import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import Typography from '@/components/atoms/Typography/Typography';

describe('Typography', () => {
  it('renders its children', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography>Good afternoon</Typography>
      </ThemeProvider>,
    );
    expect(screen.getByText('Good afternoon')).toBeInTheDocument();
  });

  it('applies the given custom theme variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography variant="heading2">Summary</Typography>
      </ThemeProvider>,
    );
    expect(screen.getByText('Summary')).toHaveClass('MuiTypography-heading2');
  });

  it('renders as the given component (e.g. span)', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography component="span">Inline text</Typography>
      </ThemeProvider>,
    );
    expect(screen.getByText('Inline text').tagName).toBe('SPAN');
  });
});
