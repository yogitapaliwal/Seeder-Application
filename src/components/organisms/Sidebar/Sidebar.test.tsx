import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import theme from '@/theme';
import Sidebar from '@/components/organisms/Sidebar/Sidebar';

describe('Sidebar', () => {
  it('renders the logo, each nav item label, and the footer slot', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Sidebar
            logo={<div data-testid="logo" />}
            items={[
              { label: 'Home', onClick: jest.fn() },
              { label: 'Cash Acceleration', onClick: jest.fn() },
            ]}
            footer={<div data-testid="footer" />}
          />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cash Acceleration')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it("fires each item's onClick when clicked", () => {
    const onClickHome = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Sidebar logo={<div />} items={[{ label: 'Home', onClick: onClickHome }]} />
        </MemoryRouter>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Home' }));

    expect(onClickHome).toHaveBeenCalledTimes(1);
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Sidebar
            logo={<div />}
            items={[{ label: 'Home', onClick: jest.fn() }]}
            sx={[{ opacity: 1 }, { opacity: 0.5 }]}
          />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(container.querySelector('aside')).toHaveStyle({ opacity: '0.5' });
  });
});
