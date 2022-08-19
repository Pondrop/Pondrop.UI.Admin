import { ChangeEvent, FunctionComponent, KeyboardEvent, useState, useEffect } from 'react';

import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { GridColDef, GridFilterModel } from '@mui/x-data-grid';

import { storeColumns } from 'components/Grid/constants';
import { useAppDispatch, useAppSelector } from 'store';
import { IFilterItem } from 'store/api/types';
import { useGetStoresQuery } from 'store/api/stores/api';
import { initialState } from 'store/api/stores/initialState';
import { selectStores, setStoresFilter, setStoresSearchValue } from 'store/api/stores/slice';
import { ColAlignDiv, RowAlignDiv, ContentWrapper, StyledTextField, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';

const Stores: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { filterItem, searchValue } = useAppSelector(selectStores);
  const { data, isFetching } = useGetStoresQuery(searchValue);

  // States
  const [searchValueString, setSearchValueString] = useState<string>('');
  const [storeFilterItem, setStoreFilterItem] = useState<IFilterItem>(initialState.filterItem);

  // Use Effects
  useEffect(() => {
    setStoreFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setSearchValueString(searchValue ?? '');
  }, [searchValue]);

  // Handlers
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValueString(e.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setStoresSearchValue(searchValueString));
    }
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setStoresFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
        operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
      }),
    );
  };

  const handleOnFilterClick = (event: ChangeEvent<HTMLInputElement>, currentColumn: GridColDef) => {
    if (!event?.target?.labels) return;

    const combinedValue =
      storeFilterItem.columnField === currentColumn.field && Array.isArray(storeFilterItem.value)
        ? handleFilterStateChange(event?.target?.labels[0].outerText, storeFilterItem)
        : [event?.target?.labels[0].outerText];

    dispatch(
      setStoresFilter({
        columnField: currentColumn.field,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  return (
    <ContentWrapper>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle variant="h5" gutterBottom>
            Stores
          </StyledTitle>
          <StyledTitle variant="caption">Last updated: 12th August, 2022 @ 10:01am</StyledTitle>
        </ColAlignDiv>
        <StyledTextField
          id="search-field"
          variant="standard"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchValueString}
          onChange={handleSearch}
          onKeyDown={handleOnKeyDown}
        />
      </RowAlignDiv>
      <Grid
        data={data?.value}
        columns={storeColumns}
        id="view-stores-grid"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={storeFilterItem}
        handleOnFilterClick={handleOnFilterClick}
      />
    </ContentWrapper>
  );
};

export default Stores;
