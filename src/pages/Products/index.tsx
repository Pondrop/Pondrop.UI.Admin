import { ChangeEvent, FunctionComponent, KeyboardEvent, useState, useEffect } from 'react';

import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { GridColDef, GridFilterModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import { productColumns } from 'components/Grid/constants';
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IFilterItem } from 'store/api/types';
import {
  useGetAllCategoriesQuery,
  useGetAllCompanyNamesQuery,
  useGetAllGTINsQuery,
  useGetAllProductsQuery,
  useGetProductsQuery,
} from 'store/api/products/api';
import { initialState } from 'store/api/products/initialState';
import {
  selectProducts,
  setProductsFilter,
  setProductsSearchValue,
  setProductsSortValue,
} from 'store/api/products/slice';
import { ColAlignDiv, RowAlignDiv, ContentWrapper, StyledTextField, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';

const Products: FunctionComponent = (): JSX.Element => {
  // States
  const [searchValueString, setSearchValueString] = useState<string>('');
  const [productsFilterItem, setProductsFilterItem] = useState<IFilterItem>(initialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '', sortValue } = useAppSelector(selectProducts);
  const { data, isFetching } = useGetProductsQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
  });
  const { data: gtinData } = useGetAllGTINsQuery();
  const { data: companyNameData } = useGetAllCompanyNamesQuery();
  const { data: productsData } = useGetAllProductsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const menuData = {
    GTIN: gtinData?.['@search.facets']?.GTIN,
    Company_Name: companyNameData?.['@search.facets']?.Company_Name,
    Product: productsData?.['@search.facets']?.Product,
    PossibleCategories: categoriesData?.['@search.facets']?.PossibleCategories,
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
      dispatch(setProductsSearchValue(searchValueString));
    }
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

  const handleOnFilterClick = (event: ChangeEvent<HTMLInputElement>, currentColumn: GridColDef) => {
    if (!event?.target?.labels) return;

    const combinedValue =
      productsFilterItem.columnField === currentColumn.field && Array.isArray(productsFilterItem.value)
        ? handleFilterStateChange(event?.target?.labels[0].outerText, productsFilterItem)
        : [event?.target?.labels[0].outerText];

    dispatch(
      setProductsFilter({
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
          <StyledTitle variant="h5" gutterBottom data-testid="products-header">
            Products
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
      />
    </ContentWrapper>
  );
};

export default Products;
