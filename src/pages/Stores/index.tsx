import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridFilterModel, GridRowParams, GridSortModel } from '@mui/x-data-grid-pro';

// Components
import Grid from 'components/Grid';
import { storeColumns } from 'components/Grid/constants';
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';

// Other variables / values
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IFilterItem } from 'store/api/types';
import { useGetAllStoreFilterQuery, useGetStoresQuery } from 'store/api/stores/api';
import {
  selectStores,
  setStoresFilter,
  setStoresSearchValue,
  setStoresSelectedProviders,
  setStoresSortValue,
} from 'store/api/stores/slice';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledTitle } from '../styles';

const Stores: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const storeFilterInitState = generateFilterInitState(storeColumns);
  const [storeFilterItem, setStoreFilterItem] = useState<IFilterItem[]>(storeFilterInitState);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const {
    filterItem = storeFilterItem,
    searchValue = '',
    selectedProviders = [],
    sortValue,
  } = useAppSelector(selectStores);
  const { data, isFetching } = useGetStoresQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
    selectedProviders,
  });

  const gridData = data?.value ?? [];
  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllStoreFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const menuData = {
    retailer: filterOptionsData?.['@search.facets']?.['retailer/name'],
    name: filterOptionsData?.['@search.facets']?.name,
    addressLine1: filterOptionsData?.['@search.facets']?.addressLine1,
    suburb: filterOptionsData?.['@search.facets']?.suburb,
    state: filterOptionsData?.['@search.facets']?.state,
    postcode: filterOptionsData?.['@search.facets']?.postcode,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
  };

  // Use Effects
  useEffect(() => {
    if (filterItem.length !== 0) setStoreFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
  }, [data]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(setStoresFilter(storeFilterInitState));
    dispatch(setStoresSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(setStoresFilter(model.items as IFilterItem[]));
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

  const handleOnFilterClick = (value: string, currColumn: string, currFilterItems: IFilterItem[]) => {
    if (!value) return;

    const columnValues = currFilterItems.find((filter) => filter.columnField === currColumn);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    setPageSkip(0);

    if (currColumn === 'retailer') dispatch(setStoresSelectedProviders(combinedValue));

    const newAppliedFilters = currFilterItems.map((filter) => {
      if (filter.columnField === currColumn)
        return {
          ...filter,
          value: combinedValue,
        };
      else return filter;
    });

    dispatch(setStoresFilter(newAppliedFilters));
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
          isfullsize={false}
          width={321}
          onEnterPress={handleSearchDispatch}
          padding="16px 14px 14px"
        />
      </RowAlignDiv>
      <Grid
        data={data?.value}
        columns={storeColumns}
        id="view-stores-grid"
        dataIdKey="id"
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
