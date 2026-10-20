import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import ContractsEmptyState from '@/components/molecules/ContractsEmptyState/ContractsEmptyState';

const renderComponent = (props: Partial<React.ComponentProps<typeof ContractsEmptyState>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <ContractsEmptyState variant="empty" {...props} />
    </ThemeProvider>,
  );

describe('ContractsEmptyState', () => {
  it('renders the error copy and calls onRetry when the retry action is clicked', () => {
    const onRetry = jest.fn();
    renderComponent({ variant: 'error', onRetry });

    expect(screen.getByText('Oops! Failed to connect')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders the empty copy for the "empty" variant and allows clicking the action', () => {
    renderComponent({ variant: 'empty' });

    expect(
      screen.getByText(
        'Connect your preferred payments or subscriptions platform to import contracts',
      ),
    ).toBeInTheDocument();

    const connectButton = screen.getByRole('button', { name: 'Connect Now' });
    expect(connectButton).toBeInTheDocument();
    fireEvent.click(connectButton);
  });
});
