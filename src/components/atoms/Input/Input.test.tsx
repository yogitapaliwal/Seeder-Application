import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Input from '@/components/atoms/Input/Input';

describe('Input', () => {
  it('renders the label and uses it as the accessible name', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input label="Cash kick name" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Cash kick name')).toBeInTheDocument();
    expect(screen.getByLabelText('Cash kick name')).toBeInTheDocument();
  });

  it('renders start/end icon slots and helper text', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input
          label="Search"
          startIcon={<span data-testid="start-icon" />}
          endIcon={<span data-testid="end-icon" />}
          helperText="Must be at least 3 characters."
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByText('Must be at least 3 characters.')).toBeInTheDocument();
  });

  it('calls onChange when typed into', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Input label="Cash kick name" onChange={onChange} />
      </ThemeProvider>,
    );

    fireEvent.change(screen.getByLabelText('Cash kick name'), { target: { value: 'Marketing' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input label="Cash kick name" disabled />
      </ThemeProvider>,
    );
    expect(screen.getByLabelText('Cash kick name')).toBeDisabled();
  });

  it('treats focus as the active state, overriding the given state, and restores it on blur', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Input label="Cash kick name" state="filled" onFocus={onFocus} onBlur={onBlur} />
      </ThemeProvider>,
    );

    const input = screen.getByLabelText('Cash kick name');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with the filled state style variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input label="Cash kick name" state="filled" />
      </ThemeProvider>,
    );
    expect(screen.getByLabelText('Cash kick name')).toBeInTheDocument();
  });

  it('omits the label wrapper entirely when no label is given', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Input />
      </ThemeProvider>,
    );
    expect(container.querySelector('input')).not.toHaveAttribute('aria-label');
  });

  it('restyles the start/end icon slots as active while focused', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input
          label="Search"
          startIcon={<span data-testid="start-icon" />}
          endIcon={<span data-testid="end-icon" />}
        />
      </ThemeProvider>,
    );

    fireEvent.focus(screen.getByLabelText('Search'));
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });
});
