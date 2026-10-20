import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import theme from '@/theme';
import Divider from '@/components/atoms/Divider/Divider';

describe('Divider', () => {
  it('renders a horizontal rule', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Divider />
      </ThemeProvider>,
    );
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('forwards extra props (e.g. aria-hidden) to the underlying MUI Divider', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Divider aria-hidden="true" />
      </ThemeProvider>,
    );
    expect(container.querySelector('hr')).toHaveAttribute('aria-hidden', 'true');
  });
});
