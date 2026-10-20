import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';

describe('Checkbox', () => {
  it('reflects the checked prop', () => {
    render(
      <ThemeProvider theme={theme}>
        <Checkbox checked onChange={jest.fn()} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when toggled', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Checkbox checked={false} onChange={onChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Checkbox checked={false} onChange={jest.fn()} disabled />
      </ThemeProvider>,
    );
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('reflects the indeterminate state', () => {
    render(
      <ThemeProvider theme={theme}>
        <Checkbox checked={false} indeterminate onChange={jest.fn()} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-indeterminate', 'true');
  });
});
