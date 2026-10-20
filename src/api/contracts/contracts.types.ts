export type ContractStatus = 'Available' | 'Financed' | 'Completed';

export type PaymentType = 'Monthly' | 'Quarterly' | 'Annually';

export interface MyContract {
  id: string;
  name: string;
  status: ContractStatus;
  type: PaymentType;
  perPayment: number;
  totalFinanced: number | null;
  totalAvailable: number;
  termLengthMonths: number;
  feePercentage: number;
  paymentAmount: number;
}

export interface AutoSelectResponse {
  selectedIds: string[];
  totalAmount: number;
}
