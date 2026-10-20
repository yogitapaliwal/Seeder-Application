import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import theme from '@/theme';
import MainTemplate from '@/components/templates/MainTemplate/MainTemplate';

const renderWithRoute = (initialEntries: string[]) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<MainTemplate />}>
            <Route path="home" element={<div>Home page content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('MainTemplate', () => {
  it('renders the sidebar nav items and the routed child content via Outlet', () => {
    renderWithRoute(['/home']);

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cash Acceleration' })).toBeInTheDocument();
    expect(screen.getByText('Home page content')).toBeInTheDocument();
  });

  it('renders the "Watch how to" footer item', () => {
    renderWithRoute(['/home']);
    expect(screen.getByText('Watch how to')).toBeInTheDocument();
  });
});
