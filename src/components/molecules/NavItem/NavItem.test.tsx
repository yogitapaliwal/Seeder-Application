import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import theme from '@/theme';
import NavItem from '@/components/molecules/NavItem/NavItem';

const renderWithRouter = (ui: React.ReactElement, initialEntries: string[] = ['/']) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </ThemeProvider>,
  );

describe('NavItem', () => {
  it('renders the label and the leading icon slot', () => {
    renderWithRouter(<NavItem label="Home" to="/home" leadingIcon={<span data-testid="icon" />} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders as a link pointing to `to` when provided', () => {
    renderWithRouter(<NavItem label="Home" to="/home" />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
  });

  it('renders as a button and fires onClick when `to` is not provided', () => {
    const onClick = jest.fn();
    renderWithRouter(<NavItem label="Log out" onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Log out' });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled is true', () => {
    renderWithRouter(<NavItem label="Log out" onClick={jest.fn()} disabled />);
    expect(screen.getByRole('button', { name: 'Log out' })).toBeDisabled();
  });

  it('matches the root path exactly, styling it as active', () => {
    renderWithRouter(<NavItem label="Home" to="/" />, ['/']);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveStyle({
      backgroundColor: 'rgb(45, 45, 48)',
    });
  });

  it('does not treat a nested path as matching the root path', () => {
    renderWithRouter(<NavItem label="Home" to="/" />, ['/settings']);
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveStyle({
      backgroundColor: 'rgb(45, 45, 48)',
    });
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    renderWithRouter(<NavItem label="Home" to="/home" sx={[{ opacity: 1 }, { opacity: 0.5 }]} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveStyle({ opacity: '0.5' });
  });
});
