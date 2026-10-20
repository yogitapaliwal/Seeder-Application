export type PaymentStatus = 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';

export interface Payment {
  id: string;
  dueDate: string;
  status: PaymentStatus;
  expectedAmount: number;
  outstandingAmount: number;
}
