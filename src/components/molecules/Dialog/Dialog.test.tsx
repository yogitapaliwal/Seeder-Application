import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Dialog from '@/components/molecules/Dialog/Dialog';

const renderDialog = (props: Partial<React.ComponentProps<typeof Dialog>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <Dialog
        open
        onClose={jest.fn()}
        title="Name your cash kick"
        subTitle="Add a name to identify your cash kick"
        {...props}
      >
        <div>Dialog body</div>
      </Dialog>
    </ThemeProvider>,
  );

describe('Dialog', () => {
  it('does not render its content when closed', () => {
    renderDialog({ open: false });
    expect(screen.queryByText('Name your cash kick')).not.toBeInTheDocument();
  });

  it('renders title, subtitle, children, and footer when open', () => {
    renderDialog({ footer: <button type="button">Cancel</button> });

    expect(screen.getByText('Name your cash kick')).toBeInTheDocument();
    expect(screen.getByText('Add a name to identify your cash kick')).toBeInTheDocument();
    expect(screen.getByText('Dialog body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    renderDialog({ onClose });

    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('hides the close button when disableClose is true', () => {
    renderDialog({ disableClose: true });
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('calls onClose on backdrop click when disableClose is false', () => {
    const onClose = jest.fn();
    const { baseElement } = renderDialog({ onClose });

    fireEvent.click(baseElement.querySelector('.MuiBackdrop-root') as Element);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ignores backdrop click when disableClose is true', () => {
    const onClose = jest.fn();
    const { baseElement } = renderDialog({ onClose, disableClose: true });

    fireEvent.click(baseElement.querySelector('.MuiBackdrop-root') as Element);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('ignores the Escape key when disableClose is true', () => {
    const onClose = jest.fn();
    renderDialog({ onClose, disableClose: true });

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    renderDialog({ sx: [{ opacity: 1 }, { opacity: 0.5 }] });
    expect(screen.getByRole('dialog')).toHaveStyle({ opacity: '0.5' });
  });
});
