import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import TableHeader from '@/components/molecules/TableHeader/TableHeader';

describe('TableHeader', () => {
  it('renders the content of every column', () => {
    render(
      <ThemeProvider theme={theme}>
        <TableHeader
          columns={[
            { id: 'name', content: <span>Name</span> },
            { id: 'status', content: <span>Status</span> },
            { id: 'amount', content: <span>Amount</span> },
          ]}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });
});
