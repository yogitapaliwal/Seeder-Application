import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import NavTabs from '@/components/molecules/NavTabs/NavTabs';

describe('NavTabs', () => {
  it('renders the tab label and exposes the active state to assistive tech', () => {
    render(
      <ThemeProvider theme={theme}>
        <NavTabs label="My contracts" state="active" />
      </ThemeProvider>,
    );

    const tab = screen.getByRole('button', { name: /my contracts/i });
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveAttribute('aria-pressed', 'true');
  });

  it('defaults to the inactive state and calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <NavTabs label="Cash kicks" onClick={onClick} />
      </ThemeProvider>,
    );

    const tab = screen.getByRole('button', { name: /cash kicks/i });
    expect(tab).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(tab);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('marks itself as disabled to assistive tech and via disabled attribute', () => {
    render(
      <ThemeProvider theme={theme}>
        <NavTabs label="Cash kicks" disabled />
      </ThemeProvider>,
    );

    const tab = screen.getByRole('button', { name: /cash kicks/i });
    expect(tab).toBeDisabled();
    expect(tab).toHaveAttribute('aria-disabled', 'true');
  });

  it('accepts a theme-aware sx function', () => {
    render(
      <ThemeProvider theme={theme}>
        <NavTabs label="Cash kicks" sx={() => ({ opacity: 0.5 })} />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: /cash kicks/i })).toHaveStyle({ opacity: '0.5' });
  });
});
