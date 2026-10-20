export type CashKickStatus = 'Pending' | 'Approved' | 'Rejected';

export interface MyCashKick {
  id: string;
  name: string;
  status: CashKickStatus;
  maturity: string;
  totalReceived: number;
  feePercentage: number;
  totalFinanced: number;
  createdAt?: string;
}
