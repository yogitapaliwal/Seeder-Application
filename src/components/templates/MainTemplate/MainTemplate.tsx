import GlobalStyles from '@mui/material/GlobalStyles';
import { Outlet } from 'react-router-dom';
import Icon from '@/components/atoms/Icon/Icon';
import Logo from '@/components/molecules/Logo/Logo';
import NavItem from '@/components/molecules/NavItem/NavItem';
import Sidebar from '@/components/organisms/Sidebar/Sidebar';
import {
  globalStyles,
  MainContent,
  Root,
  SidebarContainer,
} from '@/components/templates/MainTemplate/MainTemplate.styles';
import { NAVIGATION_ITEMS } from '@/components/templates/MainTemplate/utils';

const MainTemplate = () => {
  return (
    <Root>
      <GlobalStyles styles={globalStyles} />

      <SidebarContainer component="aside">
        <Sidebar
          logo={<Logo text="Seeder" />}
          items={NAVIGATION_ITEMS}
          footer={<NavItem label="Watch how to" leadingIcon={<Icon name="flash" size={16} />} />}
        />
      </SidebarContainer>

      <MainContent component="main">
        <Outlet />
      </MainContent>
    </Root>
  );
};

export default MainTemplate;
