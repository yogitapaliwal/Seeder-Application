import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import CashAccelerationCard from '@/components/organisms/CashAccelerationCard/CashAccelerationCard';

const items = [
  {
    id: 'term',
    title: 'Term cap',
    value: '12 months',
    iconName: 'calendar' as const,
    iconColor: '#CFC8FF',
    infoIcon: true,
  },
  {
    id: 'credit',
    title: 'Available credit',
    value: '$880.0k',
    iconName: 'document' as const,
  },
];

describe('CashAccelerationCard', () => {
  it('renders the title and value for every item', () => {
    render(
      <ThemeProvider theme={theme}>
        <CashAccelerationCard items={items} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Term cap')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
    expect(screen.getByText('Available credit')).toBeInTheDocument();
    expect(screen.getByText('$880.0k')).toBeInTheDocument();
  });

  it('renders one info icon per item that opts in via infoIcon', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CashAccelerationCard items={items} />
      </ThemeProvider>,
    );

    // 2 metric icons (always rendered) + 1 info icon (only for the first item)
    expect(container.querySelectorAll('svg')).toHaveLength(3);
  });

  it('applies the custom iconColor when provided, falling back to the theme default otherwise', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CashAccelerationCard items={items} />
      </ThemeProvider>,
    );

    // DOM order: [0] term's metric icon, [1] term's info icon, [2] credit's metric icon
    const svgs = container.querySelectorAll('svg');
    expect(svgs[0]).toHaveStyle({ color: '#CFC8FF' });
    expect(svgs[1]).toHaveStyle({ color: theme.palette.icon.secondary });
    expect(svgs[2]).toHaveStyle({ color: theme.palette.icon.primary });
  });
});
