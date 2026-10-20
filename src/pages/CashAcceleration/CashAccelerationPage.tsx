import Avatar from '@/components/atoms/Avatar';
import Greeting from '@/components/molecules/Greeting';
import TitleBar from '@/components/molecules/TitleBar';
import CashAccelerationCard from '@/components/organisms/CashAccelerationCard';
import {
  PageContainer,
  Content,
  TopSection,
  BottomSection,
  getNewCashKickButtonStyles,
} from '@/pages/CashAcceleration/CashAccelerationPage.styles';
import CashKickCard from '@/components/molecules/CashKickCard';
import Button from '@/components/atoms/Button';
import CashAccelerationSection from '@/pages/CashAcceleration/components/CashAccelerationSection/CashAccelerationSection';
import avatar from '@/assets/icons/avatar.svg';
import Icon from '@/components/atoms/Icon/Icon';
import { ROUTES } from '@/routes/paths';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { cashAccelerationApi } from '@/api/cashAcceleration/cashAcceleration.api';
import MetricSkeleton from '@/components/molecules/MetricSkeleton';
import CardSkeleton from '@/components/molecules/CardSkeleton/CardSkeleton';
import { formatAmount } from '@/utils/currencyformatter';

const CashAccelerationPage = () => {
  const navigate = useNavigate();

  const {
    data: cashAcceleration,
    loading: cashAccelerationLoading,
    error: cashAccelerationError,
  } = useApi((signal) => cashAccelerationApi.get({ signal }), []);

  const handleNewCashKick = () => {
    navigate(ROUTES.NEW_CASH_KICK);
  };

  const {
    termCapMonths = 0,
    availableCredit = 0,
    maxInterestRate = 0,
    availableForNewCashKick = 0,
  } = cashAcceleration ?? {};

  const renderTopSection = () => {
    if (cashAccelerationLoading)
      return (
        <>
          <MetricSkeleton count={3} />
          <CardSkeleton lines={2} width={340} showButton />
        </>
      );
    return (
      <>
        <CashAccelerationCard
          items={[
            {
              id: '1',
              title: 'Term cap',
              value: `${termCapMonths} months`,
              iconName: 'calendar',
              iconColor: '#CFC8FF',
              infoIcon: true,
            },
            {
              id: '2',
              title: 'Available credit',
              value: `$${(availableCredit / 1000).toFixed(2)}k`,
              iconName: 'document',
              iconColor: '#A0D7E7',
              infoIcon: true,
            },
            {
              id: '3',
              title: 'Max interest rate',
              value: `${maxInterestRate.toFixed(2)}%`,
              iconName: 'percentage-square',
              iconColor: '#E5CB9B',
              infoIcon: true,
            },
          ]}
        />
        {availableCredit ? (
          <CashKickCard
            title="Launch a new Cash Kick"
            description={`You have upto $${availableForNewCashKick.toLocaleString(undefined, { minimumFractionDigits: 2 })} available for a new cash advance`}
            highlightText={`$${availableForNewCashKick.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            button={
              <Button
                variant="primary"
                size="large"
                onClick={handleNewCashKick}
                disabled={!!cashAccelerationError}
                sx={getNewCashKickButtonStyles()}
              >
                New Cash Kick
              </Button>
            }
          />
        ) : (
          <CashKickCard
            title="100% provided credit limit utilized"
            description={`You have upto ${formatAmount(availableCredit)} available for a new cash advance`}
            highlightText={formatAmount(availableCredit)}
            button={
              // No "Request Credit Increase" flow exists yet, so this button is intentionally left without an onClick.
              <Button variant="primary" size="large" disabled={!!cashAccelerationError}>
                Request Credit Increase
              </Button>
            }
          />
        )}
      </>
    );
  };

  return (
    <PageContainer component="main">
      <Content>
        <TitleBar
          greeting={
            <Greeting
              title="Cash accleration"
              date="Place to create new cash kicks to run your business"
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
        <TopSection>{renderTopSection()}</TopSection>
        <BottomSection>
          <CashAccelerationSection />
        </BottomSection>
      </Content>
    </PageContainer>
  );
};

export default CashAccelerationPage;
