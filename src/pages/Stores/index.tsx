import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridFilterModel, GridRowParams, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import { storeColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IFilterItem } from 'store/api/types';
import { useGetAllStoreFilterQuery, useGetStoresQuery } from 'store/api/stores/api';
import { storeInitialState } from 'store/api/stores/initialState';
import { selectStores, setStoresFilter, setStoresSearchValue, setStoresSortValue } from 'store/api/stores/slice';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';

const Stores: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const [storeFilterItem, setStoreFilterItem] = useState<IFilterItem>(storeInitialState.filterItem);
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

  const gridData = data?.value ?? [];
  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllStoreFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const menuData = {
    Provider: filterOptionsData?.['@search.facets']?.Provider,
    Name: filterOptionsData?.['@search.facets']?.Name,
    Street: filterOptionsData?.['@search.facets']?.Street,
    City: filterOptionsData?.['@search.facets']?.City,
    State: filterOptionsData?.['@search.facets']?.State,
    Zip_Code: filterOptionsData?.['@search.facets']?.Zip_Code,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'Provider', sort: 'asc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    setStoreFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
  }, [data]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(
      setStoresFilter({
        columnField: '',
        value: '',
        operatorValue: 'isAnyOf',
      }),
    );
    dispatch(setStoresSearchValue(searchValue));
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

  const handleOnFilterClick = (value: string, currColumn: string, filters: IBasicFilter) => {
    if (!value) return;

    const combinedValue =
      filters.field === currColumn && Array.isArray(filters.value)
        ? handleFilterStateChange(value, filters.value)
        : [value];

    dispatch(
      setStoresFilter({
        columnField: currColumn,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  const handleOnRowClick = (params: GridRowParams) => {
    navigate(`${params.id}`, { replace: false, state: { rowData: params.row } });
  };

  return (
    <MainContent paddingSide={92} paddingTop={16}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="stores-header">
            Stores
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <SearchField
          id="store-search-field"
          value={searchValue}
          onEnterPress={handleSearchDispatch}
          padding="16px 14px 14px"
        />
      </RowAlignDiv>
      <Grid
        data={data?.value}
        columns={storeColumns}
        id="view-stores-grid"
        dataIdKey="Id"
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
        isMenuLoading={isFilterOptionsFetching}
        searchValue={searchValue}
      />
    </MainContent>
  );
};

export default Stores;
