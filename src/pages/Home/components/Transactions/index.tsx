import React from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getTransactionsAsync, selectTransactions } from 'features/transactions/transactionsSlice';
import { TransactionsWrapper } from './styles';
import { SkeletonLoading, Table, Button } from 'components';

const Transactions: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { value: transactions, status } = useAppSelector(selectTransactions);
  const hasTransactions = transactions.length > 0;

  const handleFetchTransactions = (): void => {
    dispatch(getTransactionsAsync(800));
  };

  return (
    <TransactionsWrapper>
      <h2 className="transactionTitle">Transactions:</h2>
      <div className="content">
        {!hasTransactions && status === 'idle' && (
          <span className="guidanceText">Click the button below to fetch the transactions table.</span>
        )}
        {status === 'loading' && <SkeletonLoading />}
        {hasTransactions && status === 'idle' && (
          <Table
            tableData={transactions}
            typeOfData={['date', 'amount', 'amount', 'date', 'amount', 'string']}
            sort={true}
          />
        )}
        <Button
          label={hasTransactions ? 'Refetch transactions' : 'Fetch transactions'}
          color="primary"
          variant="contained"
          onClick={handleFetchTransactions}
          disabled={status === 'loading'}
        />
      </div>
    </TransactionsWrapper>
  );
};

export default Transactions;
