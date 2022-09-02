import { FunctionComponent, useState, useEffect } from 'react';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';

import Grid from 'components/Grid';
import { categoriesColumns } from 'components/Grid/constants';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { useAppDispatch, useAppSelector } from 'store';
import { initialState } from 'store/api/constants';
import { useGetAllCategoriesFilterQuery, useGetCategoriesQuery } from 'store/api/categories/api';
import {
  selectCategories,
  setCategoriesFilter,
  setCategoriesSearchValue,
  setCategoriesSortValue,
} from 'store/api/categories/slice';
import { IFacetValue, IFilterItem } from 'store/api/types';
import { ColAlignDiv, MainContent, RowAlignDiv, StyledFab, StyledTitle } from '../styles';

const Categories: FunctionComponent = (): JSX.Element => {
  // States
  const [categoryFilterItem, setCategoryFilterItem] = useState<IFilterItem>(initialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '', sortValue } = useAppSelector(selectCategories);
  const { data, isFetching } = useGetCategoriesQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
  });

  const gridData = data?.value ?? [];
  const { data: filterOptionsData } = useGetAllCategoriesFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const menuData = {
    Category: filterOptionsData?.['@search.facets']?.Category,
    Description: filterOptionsData?.['@search.facets']?.Description,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize: 10 },
  };

  // Use Effects
  useEffect(() => {
    setCategoryFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
  }, [data]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(setCategoriesSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setCategoriesFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
        operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
      }),
    );
  };

  const handleSortModelChange = (model: GridSortModel) => {
    dispatch(
      setCategoriesSortValue({
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
      categoryFilterItem.columnField === currentColumn && Array.isArray(categoryFilterItem.value)
        ? handleFilterStateChange(value, categoryFilterItem)
        : [value];

    dispatch(
      setCategoriesFilter({
        columnField: currentColumn,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  return (
    <MainContent>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="stores-header">
            Categories
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <SearchField id="category-search-field" value={searchValue} onEnterPress={handleSearchDispatch} />
      </RowAlignDiv>
      <Grid
        data={data?.value}
        columns={categoriesColumns}
        id="view-categories-grid"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={categoryFilterItem}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
      />
      <StyledFab color="primary" variant="extended" aria-label="add">
        + Add Category
      </StyledFab>
    </MainContent>
  );
};

export default Categories;
