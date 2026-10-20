import { render, screen } from '@testing-library/react';
import Sparkline from '@/components/atoms/Sparkline/Sparkline';

describe('Sparkline', () => {
  it('renders an image for the given variant', () => {
    render(<Sparkline variant="two" />);
    expect(screen.getByRole('img', { name: 'Sparkline graph' })).toBeInTheDocument();
  });

  it('defaults to variant "one"', () => {
    const { container } = render(<Sparkline />);
    expect(container.querySelector('img')).toBeInTheDocument();
  });
});
