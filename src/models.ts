// User
export interface IIdentity {
  email: string;
  password: string;
}

// Transactions
export interface IRepaymentDetails {
  repaymentDate: string;
  repaymentAmount: number;
  fees: number;
  directDebitDate: string;
  directDebitAmount: number;
  Status: string;
}

// Applications
export interface IApplications {
  id: number;
  applicationName: string;
  applicationStatus: string;
  currentRepaymentFrequency: string;
  currentRegularPayment: string;
  currentRegularFees: string;
  lastPaymentDate: string;
}
