import { ChangeEvent, FunctionComponent, KeyboardEvent, useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from 'store';
import { ReactComponent as SearchIcon } from 'assets/icons/icon-search.svg';
import { getStoresAsync, selectStores } from 'store/stores/slice';
import { StoresWrapper } from './styles';
import { FormInputText, SkeletonLoading, Table } from 'components';

const Stores: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { value: transactions, status } = useAppSelector(selectStores);

  // Variables
  const hasTransactions = transactions.length > 0;

  // States
  const [searchValue, setSearchValue] = useState<string>('');

  // API dispatch
  useEffect(() => {
    dispatch(getStoresAsync(800));
  }, []);

  // Handlers
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Insert search event here

      // Temporary dispatch below
      dispatch(getStoresAsync(800));
    }
  };

  return (
    <StoresWrapper>
      <div className="content">
        <div className="form">
          <FormInputText
            name="search"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearch}
            icon={<SearchIcon />}
            onKeyDown={handleOnKeyDown}
          />
        </div>
        {status === 'loading' && <SkeletonLoading />}
        {hasTransactions && status === 'idle' && (
          <Table tableData={transactions} typeOfData={['number', 'string', 'string', 'string', 'string']} sort={true} />
        )}
      </div>
    </StoresWrapper>
  );
};

export default Stores;
