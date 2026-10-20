import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import DashboardInfoCard from '@/components/molecules/DashboardInfoCard/DashboardInfoCard';

describe('DashboardInfoCard', () => {
  it('renders the header slot, title, and formatted value', () => {
    render(
      <ThemeProvider theme={theme}>
        <DashboardInfoCard
          header={<div data-testid="header-slot" />}
          title="Outstanding amount"
          value={170454.55}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('header-slot')).toBeInTheDocument();
    expect(screen.getByText('Outstanding amount')).toBeInTheDocument();
    expect(screen.getByText('$170,454.55')).toBeInTheDocument();
  });

  it('renders the tag slot when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <DashboardInfoCard
          header={<div />}
          title="Due - May 03, 2021"
          value={14204.55}
          tag={<span>Due in 30 day(s)</span>}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Due in 30 day(s)')).toBeInTheDocument();
  });

  it('shows the info icon by default and hides it when showInfoIcon is false', () => {
    const { container, rerender } = render(
      <ThemeProvider theme={theme}>
        <DashboardInfoCard header={<div />} title="Outstanding amount" value={100} />
      </ThemeProvider>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <DashboardInfoCard
          header={<div />}
          title="Outstanding amount"
          value={100}
          showInfoIcon={false}
        />
      </ThemeProvider>,
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
