import Icon from '@/components/atoms/Icon/Icon';
import { render } from '@testing-library/react';

describe('Icon', () => {
  it('renders single-tone glyphs as an inline svg with the given size and color', () => {
    const { container } = render(<Icon name="home" size={20} color="#ff0000" />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveStyle({ color: '#ff0000' });
  });

  it('defaults color to currentColor (inherits the ambient text color)', () => {
    const { container } = render(
      <div style={{ color: 'rgb(255, 0, 0)' }}>
        <Icon name="home" />
      </div>,
    );
    expect(container.querySelector('svg')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it("applies extra sx overrides on top of the base color (e.g. Logo's custom width/height)", () => {
    const { container } = render(<Icon name="logo" sx={{ width: 30, height: 28 }} />);
    expect(container.querySelector('img')).toHaveStyle({ width: '30px', height: '28px' });
  });

  it('accepts an sx array (MUI array-of-overrides form) and merges it in', () => {
    const { container } = render(<Icon name="home" sx={[{ width: 40 }, { height: 40 }]} />);
    expect(container.querySelector('svg')).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('renders multi-color/fixed-palette assets as a plain img', () => {
    const { container } = render(<Icon name="logo" size={32} />);
    const img = container.querySelector('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('width', '32');
    expect(img).toHaveAttribute('alt', 'logo');
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('defaults size to 24', () => {
    const { container } = render(<Icon name="home" />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
  });
});
