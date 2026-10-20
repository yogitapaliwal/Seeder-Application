import { ThemeProvider } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/theme';
import Avatar from '@/components/atoms/Avatar/Avatar';

const renderAvatar = (props: Partial<React.ComponentProps<typeof Avatar>> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <Avatar src="avatar.png" alt="User" {...props} />
    </ThemeProvider>,
  );

describe('Avatar', () => {
  it('renders the image with the given alt text', () => {
    renderAvatar();
    expect(screen.getByRole('img', { name: 'User' })).toBeInTheDocument();
  });

  it('renders the icon slot when variant is avatarWithIcon', () => {
    renderAvatar({ variant: 'avatarWithIcon', icon: <span data-testid="icon" /> });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render the icon slot for the default variant, even if icon is given', () => {
    renderAvatar({ icon: <span data-testid="icon" /> });
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    renderAvatar({ onClick });

    fireEvent.click(screen.getByRole('img', { name: 'User' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('accepts an sx array (MUI array-of-overrides form)', () => {
    const { container } = renderAvatar({ sx: [{ opacity: 1 }, { opacity: 0.5 }] });
    expect(container.firstChild).toHaveStyle({ opacity: '0.5' });
  });
});
