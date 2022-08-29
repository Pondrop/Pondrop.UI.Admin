import { ChangeEvent, FunctionComponent, KeyboardEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { GridColDef, GridFilterModel, GridRowParams, GridSortModel } from '@mui/x-data-grid';

import { storeColumns } from 'components/Grid/constants';
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IFilterItem } from 'store/api/types';
import {
  useGetAllCitiesQuery,
  useGetAllNamesQuery,
  useGetAllPostCodesQuery,
  useGetAllProvidersQuery,
  useGetAllStatesQuery,
  useGetAllStreetsQuery,
  useGetStoresQuery,
} from 'store/api/stores/api';
import { initialState } from 'store/api/stores/initialState';
import { selectStores, setStoresFilter, setStoresSearchValue, setStoresSortValue } from 'store/api/stores/slice';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledTextField, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';

const Stores: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const [searchValueString, setSearchValueString] = useState<string>('');
  const [storeFilterItem, setStoreFilterItem] = useState<IFilterItem>(initialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '', sortValue } = useAppSelector(selectStores);
  const { data, isFetching } = useGetStoresQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
  });
  const { data: providerData } = useGetAllProvidersQuery();
  const { data: nameData } = useGetAllNamesQuery();
  const { data: streetData } = useGetAllStreetsQuery();
  const { data: cityData } = useGetAllCitiesQuery();
  const { data: stateData } = useGetAllStatesQuery();
  const { data: postcodeData } = useGetAllPostCodesQuery();

  const menuData = {
    Provider: providerData?.['@search.facets']?.Provider,
    Name: nameData?.['@search.facets']?.Name,
    Street: streetData?.['@search.facets']?.Street,
    City: cityData?.['@search.facets']?.City,
    State: stateData?.['@search.facets']?.State,
    Zip_Code: postcodeData?.['@search.facets']?.Zip_Code,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize: 10 },
  };

  // Use Effects
  useEffect(() => {
    setStoreFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setSearchValueString(searchValue ?? '');
  }, [searchValue]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
  }, [data]);

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

  const handleSortModelChange = (model: GridSortModel) => {
    dispatch(
      setStoresSortValue({
        field: model[0]?.field,
        sort: model[0]?.sort,
      }),
    );
  };

  const onPageChange = (page: number) => {
    setPageSkip(page * pageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
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

  const handleOnRowClick = (params: GridRowParams) => {
    navigate(`${params.id}`, { replace: false, state: { rowData: params.row } });
  };

  return (
    <MainContent>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle variant="h5" gutterBottom data-testid="stores-header">
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
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        onRowClick={handleOnRowClick}
      />
    </MainContent>
  );
};

export default Stores;
