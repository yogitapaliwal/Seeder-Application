import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Logo from '@/components/molecules/Logo/Logo';

const renderLogo = (props: Partial<React.ComponentProps<typeof Logo>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <Logo {...props} />
    </ThemeProvider>,
  );

describe('Logo', () => {
  it('renders the default text', () => {
    renderLogo();
    expect(screen.getByText('Seeder')).toBeInTheDocument();
  });

  it('renders custom text', () => {
    renderLogo({ text: 'Acme' });
    expect(screen.getByText('Acme')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    renderLogo({ onClick });

    fireEvent.click(screen.getByText('Seeder'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    const { container } = renderLogo({ sx: [{ opacity: 1 }, { opacity: 0.5 }] });
    expect(container.firstChild).toHaveStyle({ opacity: '0.5' });
  });
});
