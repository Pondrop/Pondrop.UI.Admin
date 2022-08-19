import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';

import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { GridColDef, GridFilterModel } from '@mui/x-data-grid';

import { storeColumns } from 'components/Grid/constants';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetStoresQuery } from 'store/api/stores/api';
import { selectStore, setFilter, setSearchValue } from 'store/api/stores/slice';
import { ColAlignDiv, RowAlignDiv, ContentWrapper, StyledTextField, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';

const Stores: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { filterItem, searchValue } = useAppSelector(selectStore);
  const { data, isFetching } = useGetStoresQuery(searchValue);

  // States
  const [searchValueString, setSearchValueString] = useState<string>('');

  // Handlers
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValueString(e.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setSearchValue(searchValueString));
    }
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
        operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
      }),
    );
  };

  const handleOnFilterClick = (event: ChangeEvent<HTMLInputElement>, currentColumn: GridColDef) => {
    if (!event?.target?.labels) return;

    const combinedValue =
      filterItem.columnField === currentColumn.field && Array.isArray(filterItem.value)
        ? handleFilterStateChange(event?.target?.labels[0].outerText, filterItem)
        : [event?.target?.labels[0].outerText];

    dispatch(
      setFilter({
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
        id="view-store-grid"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={filterItem}
        handleOnFilterClick={handleOnFilterClick}
      />
    </ContentWrapper>
  );
};

export default Stores;
