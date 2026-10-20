import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import theme from '@/theme';
import Skeleton from '@/components/atoms/Skeleton/Skeleton';

describe('Skeleton', () => {
  it('renders a rounded, animated MUI skeleton with the given width/height', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Skeleton width={200} height={20} />
      </ThemeProvider>,
    );
    const el = container.querySelector('.MuiSkeleton-root');

    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('MuiSkeleton-rounded', 'MuiSkeleton-wave');
    expect(el).toHaveStyle({ width: '200px', height: '20px' });
  });

  it('defaults width to 100% and height to 20', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Skeleton />
      </ThemeProvider>,
    );
    expect(container.querySelector('.MuiSkeleton-root')).toHaveStyle({
      width: '100%',
      height: '20px',
    });
  });
});
