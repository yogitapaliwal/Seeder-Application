import { render } from '@testing-library/react';
import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar';

describe('ProgressBar', () => {
  it('renders a fill width proportional to value/max', () => {
    const { container } = render(<ProgressBar value={50} max={100} />);
    const [track, fill] = Array.from(container.querySelectorAll('div'));

    expect(track).toBeInTheDocument();
    expect(fill).toHaveStyle({ width: '50%' });
  });

  it('defaults max to 100', () => {
    const { container } = render(<ProgressBar value={25} />);
    const fill = container.querySelectorAll('div')[1];
    expect(fill).toHaveStyle({ width: '25%' });
  });

  it('clamps the fill between 0% and 100%', () => {
    const { container, rerender } = render(<ProgressBar value={-10} max={100} />);
    expect(container.querySelectorAll('div')[1]).toHaveStyle({ width: '0%' });

    rerender(<ProgressBar value={150} max={100} />);
    expect(container.querySelectorAll('div')[1]).toHaveStyle({ width: '100%' });
  });
});
