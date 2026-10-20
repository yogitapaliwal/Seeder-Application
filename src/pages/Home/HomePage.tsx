import avatar from '@/assets/icons/avatar.svg';
import bgImage from '@/assets/images/congratulations-card.svg';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon/Icon';
import CashKickCard from '@/components/molecules/CashKickCard';
import CongratulationsCard from '@/components/molecules/CongratulationsCard';
import Greeting from '@/components/molecules/Greeting';
import TitleBar from '@/components/molecules/TitleBar';
import {
  BannerWrapper,
  CashKickCardWrapper,
  CongratulationsCardWrapper,
  IconContainer,
  PageContainer,
  PageContent,
  PageWrapperStyles,
  TopSection,
  getFullWidthButtonStyles,
} from '@/pages/Home/HomePage.styles';
import YourPayments from '@/pages/Home/components/YourPayments';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { useApi } from '@/hooks/useApi';
import { fundingApi } from '@/api/funding/funding.api';
import DashboardInfoCard from '@/components/molecules/DashboardInfoCard';
import CircularProgress from '@/components/molecules/CircularProgress';
import { useState } from 'react';
import { paymentsApi } from '@/api/payments/payments.api';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import { getTimeBasedGreeting } from '@/utils/greeting';
import { getFormattedDate } from '@/utils/dateFormatter';
import { formatAmount } from '@/utils/currencyformatter';
import Tag from '@/components/atoms/Tag/Tag';
import CardSkeleton from '@/components/molecules/CardSkeleton/CardSkeleton';
import Stack from '@mui/material/Stack';

const HomePage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: funding,
    loading,
    error: fundingError,
  } = useApi((signal) => fundingApi.get({ signal }), []);

  const {
    data: paymentsData,
    loading: paymentsLoading,
    error: paymentsError,
    refetch: refetchPayments,
  } = useApi(
    (signal) => paymentsApi.getAll(currentPage, DEFAULT_PAGE_SIZE, undefined, { signal }),
    [currentPage],
  );

  const { status = 'no_credit', availableAmount = 0, nextPayment, outstanding } = funding || {};

  const { percentagePaid = 0, amount: outstandingAmount = 0 } = outstanding || {};
  const { data: paymentsList = [], pages: totalPages = 1 } = paymentsData || {};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNewCashKick = () => {
    navigate(ROUTES.NEW_CASH_KICK);
  };

  const renderCongratulationsBanner = () => (
    <>
      <CongratulationsCardWrapper>
        <CongratulationsCard
          title="Congratulations you are ready to start!"
          description="You are approved for funding. We are ready to advance you upto "
          highlightText={formatAmount(8800000, { compact: true })}
          backgroundImage={bgImage}
        >
          <Button variant="outlinedInverted" size="large">
            Learn more
          </Button>
        </CongratulationsCard>
      </CongratulationsCardWrapper>
      <CashKickCardWrapper>
        <CashKickCard
          title="Launch a new Cash Kick"
          description={`You have upto ${formatAmount(availableAmount)} available for a new cash advance`}
          highlightText={formatAmount(availableAmount)}
          button={
            <Button
              variant="primary"
              size="large"
              onClick={handleNewCashKick}
              sx={getFullWidthButtonStyles()}
            >
              New Cash Kick
            </Button>
          }
        />
      </CashKickCardWrapper>
    </>
  );

  const renderNoCreditBanner = () => {
    const { dueDate = '', amount: nextPaymentAmount = 0, dueInDays } = nextPayment ?? {};

    return (
      <>
        <BannerWrapper>
          <DashboardInfoCard
            header={
              <IconContainer size={80}>
                <Icon name="receipt-text" size={40} color="#E39AB2" />
              </IconContainer>
            }
            title={dueDate ? `Due - ${getFormattedDate(new Date(dueDate))}` : 'Not Available'}
            value={nextPaymentAmount}
            tag={
              <Tag label={`Due in ${dueInDays ?? 'Not Available'} day(s)`} variant="important" />
            }
          />
          <DashboardInfoCard
            header={<CircularProgress value={percentagePaid} size={80} thickness={4} />}
            title="Outstanding amount"
            value={outstandingAmount}
          />
        </BannerWrapper>
        <CashKickCardWrapper>
          <CashKickCard
            title="100% provided credit limit utilized"
            description={`You have upto ${formatAmount(availableAmount)} available for a new cash advance`}
            highlightText={formatAmount(availableAmount)}
            button={
              // No "Request Credit Increase" flow exists yet, so this button is intentionally left without an onClick.
              <Button
                variant="primary"
                size="large"
                sx={getFullWidthButtonStyles()}
                disabled={!!fundingError}
              >
                Request Credit Increase
              </Button>
            }
          />
        </CashKickCardWrapper>
      </>
    );
  };

  const renderActiveBanner = () => {
    const { dueDate = '', amount: nextPaymentAmount = 0, dueInDays } = nextPayment ?? {};
    return (
      <>
        <BannerWrapper>
          {nextPayment && (
            <DashboardInfoCard
              header={
                <IconContainer size={80}>
                  <Icon name="receipt-text" size={40} color="#E39AB2" />
                </IconContainer>
              }
              title={`Due - ${getFormattedDate(new Date(dueDate))}`}
              value={nextPaymentAmount}
              tag={<Tag label={`Due in ${dueInDays} day(s)`} variant="important" />}
            />
          )}
          <DashboardInfoCard
            header={<CircularProgress value={percentagePaid} size={80} thickness={4} />}
            title="Outstanding amount"
            value={outstandingAmount}
          />
        </BannerWrapper>
        <CashKickCardWrapper>
          <CashKickCard
            title="Launch a new Cash Kick"
            description={`You have upto ${formatAmount(availableAmount)} available for a new cash advance`}
            highlightText={formatAmount(availableAmount)}
            button={
              <Button
                variant="primary"
                size="large"
                onClick={handleNewCashKick}
                sx={getFullWidthButtonStyles()}
              >
                New Cash Kick
              </Button>
            }
          />
        </CashKickCardWrapper>
      </>
    );
  };

  const renderBanner = () => {
    switch (status) {
      case 'onboarding':
        return renderCongratulationsBanner();
      case 'no_credit':
        return renderNoCreditBanner();
      case 'active':
        return renderActiveBanner();
      default:
        return null;
    }
  };

  const renderTopSection = () => {
    if (loading)
      return (
        <Stack direction="row" spacing={2}>
          <CardSkeleton width={340} showBadge mediaShape="square" lines={2} />
          <CardSkeleton mediaShape="circle" width={340} mediaSize={100} lines={2} />
          <CardSkeleton lines={2} width={340} showButton />
        </Stack>
      );

    return renderBanner();
  };

  return (
    <PageContainer>
      <PageWrapperStyles>
        <TitleBar
          greeting={
            <Greeting title={getTimeBasedGreeting()} date={getFormattedDate()} showWaveEmoji />
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
        <PageContent>
          <TopSection>{renderTopSection()}</TopSection>
          <YourPayments
            payments={paymentsList}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            loading={paymentsLoading}
            error={!!paymentsError}
            onRetry={refetchPayments}
            totalPages={totalPages}
            handleLaunchCashKick={handleNewCashKick}
          />
        </PageContent>
      </PageWrapperStyles>
    </PageContainer>
  );
};

export default HomePage;
