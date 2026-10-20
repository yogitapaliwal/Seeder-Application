import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import theme from '@/theme';
import MetricSkeleton from '@/components/molecules/MetricSkeleton/MetricSkeleton';

describe('MetricSkeleton', () => {
  it('renders 3 skeleton placeholders (icon, title, value) per metric, defaulting to count=3', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MetricSkeleton />
      </ThemeProvider>,
    );

    expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(3 * 3);
  });

  it('renders 3 skeleton placeholders per metric for a custom count', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MetricSkeleton count={1} />
      </ThemeProvider>,
    );

    expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(3);
  });
});
