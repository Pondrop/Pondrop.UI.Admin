export const personDetails = [
  {
    firstName: 'Ferrara',
    lastName: 'Clifford',
    city: 'Canberra',
  },
  { firstName: 'Jon', lastName: 'Snow', city: 'Sydney' },
  { firstName: 'Rossini', lastName: 'Frances', city: 'Melbourne' },
  { firstName: 'Cersei', lastName: 'Lannister', city: 'Adelaide' },
  { firstName: 'Jaime', lastName: 'Lannister', city: 'Brisbane' },
  { firstName: 'Daenerys', lastName: 'Targaryen', city: 'Perth' },
  { firstName: 'Arya', lastName: 'Stark', city: 'GoldCoast' },
];

export const repaymentDetails = [
  {
    repaymentDate: '2021-12-21T00:00:00.000Z',
    repaymentAmount: 252.0,
    fees: 5.07,
    directDebitDate: '2021-04-16T00:00:00.000Z',
    directDebitAmount: 247.65,
    Status: 'Scheduled',
  },
  {
    repaymentDate: '2020-04-13T00:00:00.000Z',
    repaymentAmount: 252.0,
    fees: 5.07,
    directDebitDate: '2020-07-24T00:00:00.000Z',
    directDebitAmount: 247.65,
    Status: 'Scheduled',
  },
  {
    repaymentDate: '2021-05-21T00:00:00.000Z',
    repaymentAmount: 3152.0,
    fees: 50.2,
    directDebitDate: '2021-07-20T00:00:00.000Z',
    directDebitAmount: 1200.65,
    Status: 'Cancelled',
  },
  {
    repaymentDate: '2021-02-13T00:00:00.000Z',
    repaymentAmount: 252.0,
    fees: 5.07,
    directDebitDate: '2021-02-21T00:00:00.000Z',
    directDebitAmount: 147.65,
    Status: 'Scheduled',
  },
  {
    repaymentDate: '2021-07-19T00:00:00.000Z',
    repaymentAmount: 252.0,
    fees: 15.07,
    directDebitDate: '2021-08-21T00:00:00.000Z',
    directDebitAmount: 47.65,
    Status: 'Cancelled',
  },
  {
    repaymentDate: '2021-05-15T00:00:00.000Z',
    repaymentAmount: 52.0,
    fees: 5.07,
    directDebitDate: '2021-06-09T00:00:00.000Z',
    directDebitAmount: 300.65,
    Status: 'Scheduled',
  },
];

export const applications = [
  {
    id: 1,
    applicationName: 'A000000000',
    applicationStatus: 'Canceled',
    currentRepaymentFrequency: 'Monthly',
    currentRegularPayment: '$10',
    currentRegularFees: '$0.1',
    lastPaymentDate: '2022-05-10T06:47:47.239Z',
  },
  {
    id: 2,
    applicationName: 'A000000001',
    applicationStatus: 'Approved',
    currentRepaymentFrequency: 'Monthly',
    currentRegularPayment: '$20',
    currentRegularFees: '$0.2',
    lastPaymentDate: '2022-03-10T06:47:47.239Z',
  },
  {
    id: 3,
    applicationName: 'A000000002',
    applicationStatus: 'Approved',
    currentRepaymentFrequency: 'Weekly',
    currentRegularPayment: '$30',
    currentRegularFees: '$0.3',
    lastPaymentDate: '2022-02-10T06:47:47.239Z',
  },
];
