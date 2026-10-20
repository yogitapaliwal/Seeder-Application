import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Tabs from '@/components/molecules/Tabs/Tabs';

const tabs = [
  { label: 'My Contracts', value: 'contracts' },
  { label: 'My Cash Kicks', value: 'cash-kicks' },
];

describe('Tabs', () => {
  it('renders a button for each tab', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tabs tabs={tabs} activeTab="contracts" onChange={jest.fn()} />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'My Contracts' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'My Cash Kicks' })).toBeInTheDocument();
  });

  it('calls onChange with the clicked tab value', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Tabs tabs={tabs} activeTab="contracts" onChange={onChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'My Cash Kicks' }));

    expect(onChange).toHaveBeenCalledWith('cash-kicks');
  });
});
