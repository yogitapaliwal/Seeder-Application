import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import EmptyState from '@/components/molecules/EmptyState/EmptyState';

describe('EmptyState', () => {
  it('renders the icon and title', () => {
    render(
      <ThemeProvider theme={theme}>
        <EmptyState variant="empty" icon={<div data-testid="icon" />} title="Nothing here yet" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <EmptyState
          variant="error"
          icon={<div />}
          title="Oops! Failed to connect"
          subtitle="Please contact customer support if this problem persists"
        />
      </ThemeProvider>,
    );

    expect(
      screen.getByText('Please contact customer support if this problem persists'),
    ).toBeInTheDocument();
  });

  it('renders the action button and fires onAction when both actionLabel and onAction are given', () => {
    const onAction = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <EmptyState
          variant="empty"
          icon={<div />}
          title="Nothing here yet"
          actionLabel="Retry"
          onAction={onAction}
        />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('omits the action button when actionLabel or onAction is missing', () => {
    render(
      <ThemeProvider theme={theme}>
        <EmptyState variant="empty" icon={<div />} title="Nothing here yet" actionLabel="Retry" />
      </ThemeProvider>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
