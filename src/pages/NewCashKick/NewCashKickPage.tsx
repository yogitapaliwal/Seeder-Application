import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Avatar from '@/components/atoms/Avatar';
import Greeting from '@/components/molecules/Greeting';
import TitleBar from '@/components/molecules/TitleBar';
import { BackButtonWrapper, Content, PageContainer } from '@/pages/NewCashKick/NewCashKick.styles';
import { CashKickContext } from '@/pages/NewCashKick/context/CashKickContext';
import avatar from '@/assets/icons/avatar.svg';
import Icon from '@/components/atoms/Icon/Icon';
import Button from '@/components/atoms/Button';
import { ROUTES } from '@/routes/paths';
import { getSavedSelection, saveSelection } from '@/pages/NewCashKick/utils';

const NewCashKickLayout = () => {
  const navigate = useNavigate();
  const [selectedContracts, setSelectedContracts] = useState(() => getSavedSelection());

  useEffect(() => {
    saveSelection(selectedContracts);
  }, [selectedContracts]);

  const handleNavigateHome = () => {
    navigate(ROUTES.HOME);
  };

  const cashKickContextValue = useMemo(
    () => ({ selectedContracts, setSelectedContracts }),
    [selectedContracts],
  );

  return (
    <CashKickContext.Provider value={cashKickContextValue}>
      <PageContainer component="main">
        <Content>
          <TitleBar
            greeting={
              <Greeting
                title="New cash kick"
                date="Let’s setup a new cash kick to power your Saas"
              />
            }
            avatar={
              <Avatar
                size="medium"
                src={avatar}
                alt="User"
                variant="avatarWithIcon"
                icon={<Icon name="arrow-bottom" size={16} />}
              />
            }
          />

          <BackButtonWrapper>
            <Button
              variant="tertiary"
              startIcon={<Icon name="back-btn" size={18} />}
              size="small"
              onClick={handleNavigateHome}
            >
              Back
            </Button>
          </BackButtonWrapper>
          <Outlet />
        </Content>
      </PageContainer>
    </CashKickContext.Provider>
  );
};

export default NewCashKickLayout;
