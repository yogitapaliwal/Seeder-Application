import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import theme from '@/theme';
import CardSkeleton from '@/components/molecules/CardSkeleton/CardSkeleton';

const renderComponent = (props: Partial<React.ComponentProps<typeof CardSkeleton>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <CardSkeleton {...props} />
    </ThemeProvider>,
  );

const countSkeletons = (container: HTMLElement) =>
  container.querySelectorAll('.MuiSkeleton-root').length;

describe('CardSkeleton', () => {
  it('defaults to 2 skeleton lines when `lines` is not given', () => {
    const { container } = renderComponent();
    expect(countSkeletons(container)).toBe(2);
  });

  it('renders one skeleton line per `lines`, with no badge/media/button by default', () => {
    const { container } = renderComponent({ lines: 2 });
    expect(countSkeletons(container)).toBe(2);
  });

  it('renders an extra skeleton for the badge when showBadge is true', () => {
    const { container } = renderComponent({ lines: 2, showBadge: true });
    expect(countSkeletons(container)).toBe(3);
  });

  it('renders an extra skeleton for the media when mediaShape is not "none"', () => {
    const { container } = renderComponent({ lines: 2, mediaShape: 'circle' });
    expect(countSkeletons(container)).toBe(3);
  });

  it('renders an extra skeleton for the button when showButton is true', () => {
    const { container } = renderComponent({ lines: 2, showButton: true });
    expect(countSkeletons(container)).toBe(3);
  });

  it('renders badge, media, lines, and button together', () => {
    const { container } = renderComponent({
      lines: 3,
      showBadge: true,
      mediaShape: 'square',
      showButton: true,
    });
    expect(countSkeletons(container)).toBe(6);
  });
});
