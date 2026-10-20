import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import Tag from '@/components/atoms/Tag/Tag';

describe('Tag', () => {
  it('renders the label', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tag label="Paid" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Paid')).toBeInTheDocument();
  });

  it('defaults to the "default" variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tag label="Paid" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Paid')).toBeInTheDocument();
  });

  it('renders the "important" variant without error', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tag label="Overdue" variant="important" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Overdue')).toBeInTheDocument();
  });
});
