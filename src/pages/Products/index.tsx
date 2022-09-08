import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridFilterModel, GridRowParams, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import { productColumns } from 'components/Grid/constants';
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IFilterItem, IValue } from 'store/api/types';
import { useGetAllProductFilterQuery, useGetProductsQuery } from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';
import {
  selectProducts,
  setProductsFilter,
  setProductsSearchValue,
  setProductsSortValue,
} from 'store/api/products/slice';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';

const Products: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [productsFilterItem, setProductsFilterItem] = useState<IFilterItem>(productInitialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '', sortValue } = useAppSelector(selectProducts);
  const { data, isFetching } = useGetProductsQuery(
    {
      searchString: searchValue,
      sortValue,
      filterItem,
      prevPageItems: pageSkip,
      pageSize,
    },
    {
      skip: searchValue === '',
    },
  );
  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const menuData = {
    GTIN: filterOptionsData?.['@search.facets']?.GTIN,
    Company_Name: filterOptionsData?.['@search.facets']?.Company_Name,
    Product: filterOptionsData?.['@search.facets']?.Product,
    PossibleCategories: filterOptionsData?.['@search.facets']?.PossibleCategories,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'PossibleCategories', sort: 'asc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    setProductsFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    if (searchValue === '') {
      setGridData([]);
      setRowCount(0);
    }
  }, [searchValue]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
    setGridData(data?.value ?? []);
  }, [data]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(setProductsSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setProductsFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
        operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
      }),
    );
  };

  const handleSortModelChange = (model: GridSortModel) => {
    dispatch(
      setProductsSortValue({
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

  const handleOnFilterClick = (value: string, currentColumn: string) => {
    if (!value) return;

    const combinedValue =
      productsFilterItem.columnField === currentColumn && Array.isArray(productsFilterItem.value)
        ? handleFilterStateChange(value, productsFilterItem)
        : [value];

    dispatch(
      setProductsFilter({
        columnField: currentColumn,
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
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="products-header">
            Products
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <SearchField id="product-search-field" value={searchValue} onEnterPress={handleSearchDispatch} />
      </RowAlignDiv>
      <Grid
        data={gridData}
        columns={productColumns}
        id="view-products-grid"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={productsFilterItem}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        onRowClick={handleOnRowClick}
        isMenuLoading={isFilterOptionsFetching}
      />
    </MainContent>
  );
};

export default Products;
