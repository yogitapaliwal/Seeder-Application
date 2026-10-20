import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import TitleBar from '@/components/molecules/TitleBar/TitleBar';

describe('TitleBar', () => {
  it('renders the greeting and avatar slots', () => {
    render(
      <ThemeProvider theme={theme}>
        <TitleBar
          greeting={<div data-testid="greeting">Good afternoon</div>}
          avatar={<div data-testid="avatar">Avatar</div>}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('greeting')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TitleBar
          greeting={<div>Greeting</div>}
          avatar={<div>Avatar</div>}
          sx={[{ opacity: 1 }, { opacity: 0.5 }]}
        />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyle({ opacity: '0.5' });
  });
});
