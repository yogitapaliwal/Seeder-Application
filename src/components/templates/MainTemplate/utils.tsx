import { ROUTES } from '@/routes/paths';
import Icon from '@/components/atoms/Icon/Icon';
import { NavItemProps } from '@/components/molecules/NavItem';

const NAVIGATION_ITEMS: NavItemProps[] = [
  {
    label: 'Home',
    to: ROUTES.HOME,
    leadingIcon: <Icon name="home" size={16} />,
  },
  {
    label: 'Cash Acceleration',
    to: ROUTES.CASH_ACCELERATION,
    leadingIcon: <Icon name="cash-acceleration" size={16} />,
    activeMatchers: [ROUTES.CASH_ACCELERATION, ROUTES.NEW_CASH_KICK],
  },
];

export { NAVIGATION_ITEMS };
