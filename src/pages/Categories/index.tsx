import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { GridFilterModel, GridRowParams, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import Grid from 'components/Grid';
import { categoriesColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useCreateCategoryMutation,
  useGetAllCategoriesFilterQuery,
  useGetCategoriesQuery,
} from 'store/api/categories/api';
import { categoryInitialState } from 'store/api/categories/initialState';
import {
  selectCategories,
  setCategoriesFilter,
  setCategoriesSearchValue,
  setCategoriesSortValue,
} from 'store/api/categories/slice';
import { ICreateCategoryRequest } from 'store/api/categories/types';
import { IFacetValue, IFilterItem } from 'store/api/types';
import {
  CategoryBtnWrapper,
  ColAlignDiv,
  MainContent,
  RowAlignDiv,
  RowAlignWrapper,
  StyledCategoryBtn,
  StyledTitle,
} from '../styles';
import CategoryDialog from './components/CategoryDialog';

const Categories: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const [categoryFilterItem, setCategoryFilterItem] = useState<IFilterItem>(categoryInitialState.filterItem);
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
  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllCategoriesFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [createCategory, { isSuccess, reset }] = useCreateCategoryMutation({
    fixedCacheKey: 'shared-snackbar-state',
  });

  const menuData = {
    Category: filterOptionsData?.['@search.facets']?.Category,
    Description: filterOptionsData?.['@search.facets']?.Description,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'Category', sort: 'asc' as GridSortDirection }] },
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

  const handleOnFilterClick = (value: string, currColumn: string, filters: IBasicFilter) => {
    if (!value) return;

    const combinedValue =
      filters.field === currColumn && Array.isArray(filters.value)
        ? handleFilterStateChange(value, filters.value)
        : [value];

    dispatch(
      setCategoriesFilter({
        columnField: currColumn,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  const handleAddCategory = () => {
    setIsCreateModalOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    reset();
  };

  const handleOnRowClick = (params: GridRowParams) => {
    navigate(`${params.id}`, { replace: false, state: { rowData: params.row } });
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateModalSubmit = (createData: ICreateCategoryRequest) => {
    createCategory(createData);
  };

  // useEffects
  useEffect(() => {
    setIsSnackbarOpen(isSuccess);
  }, [isSuccess]);

  return (
    <MainContent>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="categories-header">
            Categories
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <RowAlignWrapper>
          <CategoryBtnWrapper rightmargin={20}>
            <StyledCategoryBtn
              data-testid="add-category-btn"
              className="add-category-btn"
              variant="contained"
              disableElevation
              onClick={handleAddCategory}
              height={48}
            >
              + Add Category
            </StyledCategoryBtn>
          </CategoryBtnWrapper>
          <SearchField id="category-search-field" value={searchValue} onEnterPress={handleSearchDispatch} />
        </RowAlignWrapper>
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
        onRowClick={handleOnRowClick}
        isMenuLoading={isFilterOptionsFetching}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          Successfully created a category!
        </Alert>
      </Snackbar>
      <CategoryDialog
        isOpen={isCreateModalOpen}
        handleClose={handleCreateModalClose}
        handleSubmit={handleCreateModalSubmit}
      />
    </MainContent>
  );
};

export default Categories;
