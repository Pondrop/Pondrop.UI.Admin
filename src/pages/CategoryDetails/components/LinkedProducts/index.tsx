import { useEffect, useState } from 'react';
import { GridFilterModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import Grid from 'components/Grid';
import { linkedProductsColumns } from 'components/Grid/constants';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { SpaceBetweenDiv, StyledCardTitle } from 'pages/styles';
import { useGetAllProductFilterQuery, useGetProductsQuery } from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';
import { IFacetValue, IFilterItem, ISortItem, IValue } from 'store/api/types';

const LinkedProducts = (): JSX.Element => {
  const [gridData, setGridData] = useState<IValue[]>([]);
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

  const { data: filterOptionsData } = useGetAllProductFilterQuery(
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

  const handleOnFilterClick = (value: string, currentColumn: string) => {
    if (!value) return;

    const combinedValue =
      filterVal.columnField === currentColumn && Array.isArray(filterVal.value)
        ? handleFilterStateChange(value, filterVal)
        : [value];

    setFilterVal({
      columnField: currentColumn,
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

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
    setGridData(data?.value ?? []);
  }, [data]);

  return (
    <div>
      <SpaceBetweenDiv>
        <StyledCardTitle variant="h6" gutterBottom>
          Linked Products
        </StyledCardTitle>
        <SearchField
          id="category-search-field"
          value={searchVal}
          onEnterPress={handleSearchDispatch}
          isfullsize={false}
        />
      </SpaceBetweenDiv>
      <Grid
        data={gridData}
        columns={linkedProductsColumns}
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
      />
    </div>
  );
};

export default LinkedProducts;
