import EmptyState from '@/components/molecules/EmptyState';
import Icon from '@/components/atoms/Icon/Icon';
import { ContractsEmptyStateProps } from '@/components/molecules/ContractsEmptyState/ContractsEmptyState.types';

const ContractsEmptyState = ({ variant, onRetry }: ContractsEmptyStateProps) => {
  if (variant === 'error') {
    return (
      <EmptyState
        variant="error"
        icon={<Icon name="warning" size={160} />}
        title="Oops! Failed to connect"
        subtitle="Please contact customer support if this problem persists"
        onAction={onRetry}
        actionLabel="Retry"
      />
    );
  }

  return (
    <EmptyState
      variant="empty"
      icon={<Icon name="finance-planning" size={160} />}
      title="Connect your preferred payments or subscriptions platform to import contracts"
      // No contract-import flow exists yet, so "Connect Now" is intentionally a no-op.
      onAction={() => {}}
      actionLabel="Connect Now"
    />
  );
};

export default ContractsEmptyState;
