import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CashKickContext } from '@/pages/NewCashKick/context/CashKickContext';
import { ROUTES } from '@/routes/paths';
import { ContractsSection, PageContent } from '@/pages/NewCashKick/NewCashKick.styles';
import SummaryCard from '@/components/organisms/SummaryCard';
import Icon from '@/components/atoms/Icon/Icon';
import Button from '@/components/atoms/Button';
import { useApi } from '@/hooks/useApi';
import { cashAccelerationApi } from '@/api/cashAcceleration/cashAcceleration.api';
import { cashKicksApi } from '@/api/cashkicks/cashkicks.api';
import { contractsApi } from '@/api/contracts/contracts.api';
import { formatCurrency } from '@/utils/currencyformatter';
import YourContracts from '@/pages/NewCashKick/components/YourContracts/YourContracts';
import Dialog from '@/components/molecules/Dialog';
import Typography from '@/components/atoms/Typography/Typography';
import Input from '@/components/atoms/Input';
import {
  UnderReviewContent,
  getUnderReviewDescriptionStyles,
  getUnderReviewTitleStyles,
} from '@/pages/NewCashKick/components/ReviewContracts/ReviewContracts.styles';

type CashKickDialogState = 'closed' | 'create' | 'underReview';

const calculateMaturityDate = (termMonths: number): string => {
  const maturityDate = new Date();
  maturityDate.setMonth(maturityDate.getMonth() + termMonths);
  return maturityDate.toISOString().slice(0, 10);
};

const ReviewContracts = () => {
  const { selectedContracts } = useContext(CashKickContext);
  const [dialogState, setDialogState] = useState<CashKickDialogState>('closed');
  const [cashKickName, setCashKickName] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    data: cashAcceleration,
    loading: cashAccelerationLoading,
    error: cashAccelerationError,
  } = useApi((signal) => cashAccelerationApi.get({ signal }), []);

  const hasNoSelection = selectedContracts.length === 0;

  useEffect(() => {
    if (hasNoSelection) {
      navigate(ROUTES.NEW_CASH_KICK_SELECT, { replace: true });
    }
  }, [hasNoSelection, navigate]);

  // Warn before tab close/refresh while a submission is in flight
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (submitting) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [submitting]);

  const { termCapMonths = 0, maxInterestRate = 0 } = cashAcceleration ?? {};

  const selectedAmount = useMemo(
    () => selectedContracts.reduce((sum, contract) => sum + contract.paymentAmount, 0),
    [selectedContracts],
  );

  const feeAmount = useMemo(
    () => selectedAmount * (maxInterestRate / 100),
    [selectedAmount, maxInterestRate],
  );

  const payBackAmount = useMemo(() => selectedAmount + feeAmount, [selectedAmount, feeAmount]);

  const totalPayout = useMemo(() => selectedAmount - feeAmount, [selectedAmount, feeAmount]);

  const handleOpenCreate = () => {
    setCashKickName('');
    setSubmitError(null);
    setDialogState('create');
  };

  const handleCloseDialog = () => {
    if (submitting) return; // block dismissal while a request is in flight
    setDialogState('closed');
  };

  const handleCreateCashKick = async () => {
    if (submitting) return; // guard against double-fire race condition

    setSubmitting(true);
    setSubmitError(null);

    try {
      await cashKicksApi.create({
        name: cashKickName,
        status: 'Pending',
        maturity: calculateMaturityDate(termCapMonths),
        totalReceived: 0,
        feePercentage: maxInterestRate,
        totalFinanced: totalPayout,
        createdAt: new Date().toISOString(),
      });
      // Mark each selected contract as financed, so it can't be re-selected elsewhere
      await Promise.all(
        selectedContracts.map((contract) =>
          contractsApi.update(contract.id, {
            status: 'Financed',
            totalFinanced: contract.paymentAmount,
          }),
        ),
      );
      setDialogState('underReview');
    } catch (error) {
      setSubmitError('Something went wrong creating your cash kick. Please try again.');
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewCashKicks = () => {
    setDialogState('closed');
    navigate(ROUTES.CASH_ACCELERATION_CASH_KICKS);
  };

  if (hasNoSelection) {
    return null; // redirect is in-flight via useEffect above
  }

  const handleCloseUnderReviewDialog = () => {
    navigate(ROUTES.HOME);
  };

  const renderCreateDialog = () => (
    <Dialog
      open={dialogState === 'create'}
      onClose={handleCloseDialog}
      title="Name your cash kick"
      subTitle="Add a name to identify your cash kick"
      footer={
        <>
          <Button variant="tertiary" size="large" onClick={handleCloseDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="large"
            disabled={cashKickName.length < 3 || submitting}
            onClick={handleCreateCashKick}
          >
            {submitting ? 'Creating...' : 'Create Cash Kick'}
          </Button>
        </>
      }
    >
      <Input
        label="Cash kick name"
        placeholder="Ex: marketing expenses"
        value={cashKickName}
        onChange={(e) => setCashKickName(e.target.value)}
        disabled={submitting}
      />
      {submitError && (
        <Typography variant="body2" color="error.main">
          {submitError}
        </Typography>
      )}
    </Dialog>
  );

  const renderUnderReviewDialog = () => (
    <Dialog
      subTitle="We are reviewing your cash kick"
      open={dialogState === 'underReview'}
      onClose={handleCloseUnderReviewDialog}
      title="Cash kick launched successfully!"
      footer={
        <>
          <Button variant="tertiary" size="large" onClick={handleCloseUnderReviewDialog}>
            Close
          </Button>
          <Button variant="primary" size="large" onClick={handleViewCashKicks}>
            View Cash Kicks
          </Button>
        </>
      }
    >
      <UnderReviewContent>
        <Icon name="review-gif" size={172} />
        <Typography variant="heading2" sx={getUnderReviewTitleStyles()}>
          Your cash kick is under review
        </Typography>
        <Typography variant="body1" sx={getUnderReviewDescriptionStyles()}>
          It will remain on pending state until we review it internally. This can take upto 5 mins
          to a couple of hours. Once reviewed, the cash will be transferred to your account and
          you'll be notified.
        </Typography>
      </UnderReviewContent>
    </Dialog>
  );

  return (
    <PageContent>
      <ContractsSection>
        <YourContracts
          contracts={selectedContracts}
          selectedRows={selectedContracts.map((contract) => contract.id)}
          remainingCredit={0}
          totalPages={1}
          currentPage={1}
          handlePageChange={() => {}}
          readOnly
          loading={cashAccelerationLoading}
          error={!!cashAccelerationError}
        />
      </ContractsSection>

      <SummaryCard
        title="Summary"
        infoIcon={<Icon name="info-circle" />}
        topItems={[
          { id: 'term', label: 'Term', value: `${termCapMonths} months` },
          {
            id: 'contracts',
            label: 'Selected contracts',
            value: String(selectedContracts.length),
          },
        ]}
        bottomItems={[
          { id: 'payback', label: 'Pay back amount', value: formatCurrency(payBackAmount) },
          {
            id: 'rate',
            label: 'Rate %',
            value: formatCurrency(feeAmount),
            secondaryValue: `(${maxInterestRate.toFixed(2)}%)`,
          },
        ]}
        total={{ label: 'Total Payout', value: formatCurrency(totalPayout) }}
        footer={
          <Button variant="primary" fullWidth onClick={handleOpenCreate}>
            Submit Your Credit
          </Button>
        }
      />
      {renderCreateDialog()}
      {renderUnderReviewDialog()}
    </PageContent>
  );
};

export default ReviewContracts;
