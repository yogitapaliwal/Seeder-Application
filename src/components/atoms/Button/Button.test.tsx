import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Button from '@/components/atoms/Button/Button';

describe('Button', () => {
  it('renders its children as the accessible name', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button>Click me</Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Button onClick={onClick}>Click me</Button>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button disabled>Click me</Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();
  });

  it('shows a loading indicator and disables the button when loading is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button loading>Click me</Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();
  });

  it('does not render the MUI ripple span (disableRipple is always on)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button>Click me</Button>
      </ThemeProvider>,
    );
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Click me' }));
    expect(container.querySelector('.MuiTouchRipple-root')).not.toBeInTheDocument();
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button sx={[{ opacity: 1 }, { opacity: 0.5 }]}>Click me</Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toHaveStyle({ opacity: '0.5' });
  });
});
