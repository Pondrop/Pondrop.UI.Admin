import { useEffect, useState } from 'react';
import { Info } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortModel } from '@mui/x-data-grid-pro';

// Components
import Grid from 'components/Grid';
import SearchField from 'components/SearchField';

// Constants
import { campaignStoreColumns } from 'components/Grid/constants';

// Store / APIs
import { useAppDispatch, useAppSelector } from 'store';
import { useGetAllStoreFilterQuery, useGetStoresQuery } from 'store/api/stores/api';
import {
  selectStores,
  setStoresFilter,
  setStoresSearchValue,
  setStoresSelectedIds,
  setStoresSelectedProviders,
  setStoresSortValue,
} from 'store/api/stores/slice';

// Styles
import { MessageWrapper, RowAlignWrapper, SpaceBetweenDiv, StyledCardTitle } from 'pages/styles';

// Types
import { IFacetValue, IFilterItem, IValue } from 'store/api/types';

// Utils
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';

const StoreGrid = (): JSX.Element => {
  // States
  const storeFilterInitState = generateFilterInitState(campaignStoreColumns);
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [storeFilterItemState, setStoreFilterItemState] = useState<IFilterItem[]>(storeFilterInitState);
  const [storePageSize, setStorePageSize] = useState<number>(10);
  const [storePageSkip, setStorePageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const {
    filterItem: storeFilterItem = storeFilterItemState,
    searchValue: storeSearchValue = '',
    selectedIds: selectedStoresIds,
    selectedProviders = [],
    sortValue: storeSortValue,
  } = useAppSelector(selectStores);

  // Stores API Call
  const { data: storeData, isFetching: isStoreFetching } = useGetStoresQuery({
    searchString: storeSearchValue,
    sortValue: storeSortValue,
    filterItem: storeFilterItem,
    prevPageItems: storePageSkip,
    pageSize: storePageSize,
    selectedProviders,
  });

  // Store Filter Options
  const { data: storeOptionsData, isFetching: isStoreFilterOptionsFetching } = useGetAllStoreFilterQuery(
    { searchString: storeSearchValue },
    { skip: !gridData?.length },
  );

  const menuData = {
    retailer: storeOptionsData?.['@search.facets']?.['retailer/name'],
    name: storeOptionsData?.['@search.facets']?.name,
    addressLine1: storeOptionsData?.['@search.facets']?.addressLine1,
    suburb: storeOptionsData?.['@search.facets']?.suburb,
    state: storeOptionsData?.['@search.facets']?.state,
    postcode: storeOptionsData?.['@search.facets']?.postcode,
  };

  const [storeRowCount, setStoreRowCount] = useState<number>(0);

  const initialGridState = {
    pagination: { pageSize: storePageSize },
  };

  useEffect(() => {
    setStoreRowCount(storeData?.['@odata.count'] ?? 0);
    setGridData(storeData?.value ?? []);
  }, [storeData]);

  useEffect(() => {
    if (storeFilterItem.length !== 0) setStoreFilterItemState(storeFilterItem);
  }, [storeFilterItem]);

  const handleSearchDispatch = (searchValue: string) => {
    dispatch(setStoresFilter(storeFilterInitState));
    dispatch(setStoresSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(setStoresFilter(model.items as IFilterItem[]));
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    dispatch(setStoresSelectedIds(selectionModel as string[]));
  };

  const handleOnFilterClick = (value: string, currColumn: string, currFilterItems: IFilterItem[]) => {
    if (!value) return;

    const columnValues = currFilterItems.find((filter) => filter.columnField === currColumn);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    setStorePageSkip(0);

    if (currColumn === 'retailer') dispatch(setStoresSelectedProviders(combinedValue));
    else {
      const newAppliedFilters = currFilterItems.map((filter) => {
        if (filter.columnField === currColumn)
          return {
            ...filter,
            value: combinedValue,
          };
        else return filter;
      });
      dispatch(setStoresSelectedProviders([]));
      dispatch(setStoresFilter(newAppliedFilters));
    }
  };

  const onPageChange = (page: number) => {
    setStorePageSkip(page * storePageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setStorePageSize(pageSize);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    dispatch(
      setStoresSortValue({
        field: model[0]?.field,
        sort: model[0]?.sort,
      }),
    );
  };

  const renderSelectedCount = () => {
    if (selectedStoresIds?.length === 0) return;
    const count = selectedStoresIds?.length ?? 0;
    const focus = count > 1 ? 'stores' : 'store';

    return (
      <MessageWrapper color="#006492">
        {count} {focus} selected
      </MessageWrapper>
    );
  };

  return (
    <div>
      <SpaceBetweenDiv withmargin={false}>
        <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600, lineHeight: '40px', margin: '0' }}>
          <SpaceBetweenDiv withmargin={false}>
            <RowAlignWrapper>
              Select stores
              <Tooltip title="Select the stores where your campaign will be available" placement="top">
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
              </Tooltip>
              {renderSelectedCount()}
            </RowAlignWrapper>
          </SpaceBetweenDiv>
        </StyledCardTitle>
        <div className="select-store" style={{ height: '40px' }}>
          <SearchField
            id="select-store-search-field"
            value={storeSearchValue}
            onEnterPress={handleSearchDispatch}
            isfullsize={false}
            width={266}
            padding="8px 12px 8px 0"
            variant="outlined"
            placeholder="Search by store name and address"
          />
        </div>
      </SpaceBetweenDiv>
      <Grid
        data={gridData}
        columns={campaignStoreColumns}
        id="view-store-mini-grid"
        dataIdKey="id"
        isFetching={isStoreFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={storeFilterItemState}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={storeRowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        withBorder={false}
        isMenuLoading={isStoreFilterOptionsFetching}
        withPadding={false}
        withCheckboxSelection={true}
        rowHeight={40}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectedStoresIds}
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
};

export default StoreGrid;
