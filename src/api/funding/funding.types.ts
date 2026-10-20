export type FundingStatus = 'onboarding' | 'no_credit' | 'active';

export interface NextPayment {
  dueDate: string;
  dueInDays: number;
  amount: number;
}

export interface Outstanding {
  amount: number;
  percentagePaid: number;
}

export interface Funding {
  approvedAmount: number;
  availableAmount: number;
  status: FundingStatus;
  asOfDate: string;
  nextPayment: NextPayment | null;
  outstanding: Outstanding;
}
