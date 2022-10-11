import { useState } from 'react';
import { Info, PlaylistAdd } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { GridFilterModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import Grid from 'components/Grid';
import { productColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { productsDummyData } from 'pages/Products/components/CategoryList/constants';
import { RowAlignWrapper, SpaceBetweenDiv, StyledCardTitle } from 'pages/styles';
import { useGetAllProductFilterQuery, useGetProductsQuery } from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';
import { IFacetValue, IFilterItem, ISortItem, IProductValue } from 'store/api/types';
import { tooltipContent } from '../CategoryInfoPanel/constants';

const LinkedProducts = (): JSX.Element => {
  const [gridData, setGridData] = useState<IProductValue[]>(productsDummyData);
  const [searchVal, setSearchVal] = useState<string>('');
  const [filterVal, setFilterVal] = useState<IFilterItem>(productInitialState.filterItem);
  const [sortVal, setSortVal] = useState<ISortItem>(productInitialState.sortValue);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const { data, isFetching } = useGetProductsQuery(
    {
      searchString: searchVal,
      sortValue: sortVal,
      filterItem: filterVal,
      prevPageItems: pageSkip,
      pageSize,
    },
    {
      skip: searchVal === '',
    },
  );

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: searchVal },
    { skip: !gridData.length },
  );

  const menuData = {
    GTIN: filterOptionsData?.['@search.facets']?.GTIN,
    Product: filterOptionsData?.['@search.facets']?.Product,
    PossibleCategories: filterOptionsData?.['@search.facets']?.PossibleCategories,
    Brand: filterOptionsData?.['@search.facets']?.Brand,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'PossibleCategories', sort: 'asc' as GridSortDirection }] },
  };

  const handleSearchDispatch = (searchValue: string) => {
    setSearchVal(searchValue);
    if (searchValue === '') {
      setGridData([]);
      setRowCount(0);
    }
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    setFilterVal({
      columnField: model.items[0].columnField,
      value: model.items[0].value,
      operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
    });
  };

  const handleOnFilterClick = (value: string, currColumn: string, filters: IBasicFilter) => {
    if (!value) return;

    const combinedValue =
      filters.field === currColumn && Array.isArray(filters.value)
        ? handleFilterStateChange(value, filters.value)
        : [value];

    setFilterVal({
      columnField: currColumn,
      value: combinedValue,
      operatorValue: 'isAnyOf',
    });
  };

  const onPageChange = (page: number) => {
    setPageSkip(page * pageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    setSortVal({
      field: model[0]?.field,
      sort: model[0]?.sort,
    });
  };

  return (
    <div>
      <SpaceBetweenDiv>
        <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
          <SpaceBetweenDiv withmargin={false}>
            <RowAlignWrapper>
              Linked products
              <Tooltip title={tooltipContent['linkedProducts']} placement="top">
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
              </Tooltip>
            </RowAlignWrapper>
            <IconButton aria-label="Add category" size="small" style={{ marginLeft: '4px' }}>
              <PlaylistAdd fontSize="inherit" />
            </IconButton>
          </SpaceBetweenDiv>
        </StyledCardTitle>
        <div className="linked-products">
          <SearchField
            id="category-search-field"
            value={searchVal}
            onEnterPress={handleSearchDispatch}
            isfullsize={false}
            width={266}
            padding="8px 12px 8px 0"
            variant="outlined"
            placeholder="Search by product name or barcode"
          />
        </div>
      </SpaceBetweenDiv>
      <Grid
        data={gridData}
        columns={productColumns}
        id="view-products-mini-grid"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={filterVal}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        withBorder={false}
        isMenuLoading={isFilterOptionsFetching}
        withPadding={false}
        withCheckboxSelection={true}
      />
    </div>
  );
};

export default LinkedProducts;
