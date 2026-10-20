import { useCallback, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon/Icon';
import Typography from '@/components/atoms/Typography/Typography';
import Tabs from '@/components/molecules/Tabs';
import {
  Container,
  Header,
  TitleContainer,
  Content,
  getTitleStyles,
} from '@/pages/CashAcceleration/components/CashAccelerationSection/CashAccelerationSection.styles';
import { CashAccelerationOutletContext } from '@/pages/CashAcceleration/components/CashAccelerationSection/CashAccelerationSection.types';
import { TAB_ITEMS } from '@/pages/CashAcceleration/components/CashAccelerationSection/utils';

const CashAccelerationSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [refetchCount, setRefetchCount] = useState<number>(0);
  const [syncing, setSyncing] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    navigate(value);
  };

  const handleSync = () => {
    setSyncing(true);
    setRefetchCount((count) => count + 1);
  };

  const handleSyncComplete = useCallback(() => {
    setSyncing(false);
  }, []);

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Typography variant="heading2" sx={getTitleStyles()}>
            Cash acceleration
          </Typography>
          <Icon name="info-circle" size={20} />
        </TitleContainer>

        <Button
          variant="text"
          startIcon={<Icon name="refresh" size={20} />}
          onClick={handleSync}
          loading={syncing}
        >
          Sync Now
        </Button>
      </Header>

      <Content>
        <Tabs tabs={TAB_ITEMS} activeTab={location.pathname} onChange={handleTabChange} />
        <Outlet
          context={
            {
              refetchCount,
              onSyncComplete: handleSyncComplete,
            } satisfies CashAccelerationOutletContext
          }
        />
      </Content>
    </Container>
  );
};

export default CashAccelerationSection;
