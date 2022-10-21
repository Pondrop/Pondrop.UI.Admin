import { useEffect, useState } from 'react';
import { Info } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import Grid from 'components/Grid';
import { campaignStoreColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { MessageWrapper, RowAlignWrapper, SpaceBetweenDiv, StyledCardTitle } from 'pages/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetAllStoreFilterQuery, useGetStoresQuery } from 'store/api/stores/api';
import {
  selectStores,
  setStoresFilter,
  setStoresSearchValue,
  setStoresSelectedIds,
  setStoresSortValue,
} from 'store/api/stores/slice';
import { IFacetValue, IValue } from 'store/api/types';

const StoreGrid = (): JSX.Element => {
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [storePageSize, setStorePageSize] = useState<number>(10);
  const [storePageSkip, setStorePageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const {
    filterItem: storeFilterItem,
    searchValue: storeSearchValue = '',
    selectedIds: selectedStoresIds,
    sortValue: storeSortValue,
  } = useAppSelector(selectStores);

  // Stores API Call
  const { data: storeData, isFetching: isStoreFetching } = useGetStoresQuery({
    searchString: storeSearchValue,
    sortValue: storeSortValue,
    filterItem: storeFilterItem,
    prevPageItems: storePageSkip,
    pageSize: storePageSize,
  });

  // Store Filter Options
  const { data: storeOptionsData, isFetching: isStoreFilterOptionsFetching } = useGetAllStoreFilterQuery(
    { searchString: storeSearchValue },
    { skip: !gridData?.length },
  );

  const menuData = {
    Name: storeOptionsData?.['@search.facets']?.Name,
    Provider: storeOptionsData?.['@search.facets']?.Provider,
    State: storeOptionsData?.['@search.facets']?.State,
    City: storeOptionsData?.['@search.facets']?.City,
    Zip_Code: storeOptionsData?.['@search.facets']?.Zip_Code,
  };

  const [storeRowCount, setStoreRowCount] = useState<number>(0);

  const initialGridState = {
    pagination: { pageSize: storePageSize },
    sorting: { sortModel: [{ field: 'Provider', sort: 'asc' as GridSortDirection }] },
  };

  useEffect(() => {
    setStoreRowCount(storeData?.['@odata.count'] ?? 0);
    setGridData(storeData?.value ?? []);
  }, [storeData]);

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

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    dispatch(setStoresSelectedIds(selectionModel as string[]));
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
        isFetching={isStoreFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={storeFilterItem}
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
