import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import AutoSelectSection from '@/components/molecules/AutoSelectSection/AutoSelectSection';

const baseProps = {
  title: 'Slide to autoselect',
  slider: <div data-testid="slider" />,
  selectedAmount: '$60,000.00',
  totalAmount: '$100,000.00',
  remainingAmount: '$40,000.00',
  isRemainingZero: false,
  isResetBtnDisabled: false,
  onReset: jest.fn(),
};

const renderComponent = (props: Partial<typeof baseProps> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <AutoSelectSection {...baseProps} {...props} />
    </ThemeProvider>,
  );

describe('AutoSelectSection', () => {
  it('renders the title and the slider slot', () => {
    renderComponent();
    expect(screen.getByText('Slide to autoselect')).toBeInTheDocument();
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });

  it('renders the selected/total amount summary', () => {
    renderComponent();
    expect(screen.getByText('$60,000.00')).toBeInTheDocument();
    expect(screen.getByText('$100,000.00')).toBeInTheDocument();
    expect(screen.getByText('selected of')).toBeInTheDocument();
  });

  it('renders the remaining amount when provided', () => {
    renderComponent();
    expect(screen.getByText('$40,000.00 remaining')).toBeInTheDocument();
  });

  it('omits the remaining amount line when not provided', () => {
    renderComponent({ remainingAmount: '' });
    expect(screen.queryByText(/remaining/)).not.toBeInTheDocument();
  });

  it('calls onReset when the reset button is clicked', () => {
    const onReset = jest.fn();
    renderComponent({ onReset });

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('disables the reset button when isResetBtnDisabled is true', () => {
    renderComponent({ isResetBtnDisabled: true });
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled();
  });

  it('styles the remaining amount as an error when isRemainingZero is true', () => {
    renderComponent({ isRemainingZero: true, remainingAmount: '$0.00' });
    expect(screen.getByText('$0.00 remaining')).toBeInTheDocument();
  });
});
