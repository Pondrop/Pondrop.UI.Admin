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
  categoriesApi,
  useCreateCategoryMutation,
  useCreateCategoryGroupingMutation,
  useGetAllCategoriesFilterQuery,
  useGetCategoriesQuery,
  useLazyRefreshCategoriesQuery,
} from 'store/api/categories/api';
import { categoryInitialState } from 'store/api/categories/initialState';
import {
  selectCategories,
  setCategoriesFilter,
  setCategoriesSearchValue,
  setCategoriesSortValue,
} from 'store/api/categories/slice';
import { ICategory, ICategoryDialogData } from 'store/api/categories/types';
import { IFacetValue, IFilterItem, IValue } from 'store/api/types';
import {
  CategoryBtnWrapper,
  ColAlignDiv,
  MainContent,
  RowAlignDiv,
  RowAlignWrapper,
  StyledBreadcrumbs,
  StyledCategoryBtn,
  StyledTitle,
  StyledTypography,
} from '../styles';
import CategoryDialog from './components/CategoryDialog';

const Categories: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [categoryFilterItem, setCategoryFilterItem] = useState<IFilterItem>(categoryInitialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '', sortValue } = useAppSelector(selectCategories);
  const { data, isFetching, refetch } = useGetCategoriesQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
  });

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllCategoriesFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const [refreshCategories, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] =
    useLazyRefreshCategoriesQuery();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [parentCategory, setParentCategory] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [
    createCategory,
    {
      data: createCategoryResponse,
      isSuccess: isCreateCategSuccess,
      error: createCategError,
      reset: resetCreateCategSuccess,
      isLoading: isCreateCategLoading,
    },
  ] = useCreateCategoryMutation();
  const [
    createCategoryGrouping,
    {
      isSuccess: isCreateCategGroupingSuccess,
      reset: resetCreateCategGroupingSuccess,
      isLoading: isCreateCategGroupLoading,
    },
  ] = useCreateCategoryGroupingMutation();

  const menuData = {
    categoryName: filterOptionsData?.['@search.facets']?.categoryName,
    parentName: filterOptionsData?.['@search.facets']?.parentName,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'categoryName', sort: 'asc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    setCategoryFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
    setGridData(data?.value ?? []);
  }, [data]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(
      setCategoriesFilter({
        columnField: '',
        value: '',
        operatorValue: 'isAnyOf',
      }),
    );
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
    resetCreateCategSuccess();
    resetCreateCategGroupingSuccess();
  };

  const handleOnRowClick = (params: GridRowParams) => {
    navigate(`${params.row.lowerLevelCategoryId}`, { replace: false, state: { rowData: params.row } });
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    setErrMsg('');
  };

  const handleCreateModalSubmit = async (createData: ICategoryDialogData) => {
    const { name, higherLevelCategoryId } = createData;
    setParentCategory(higherLevelCategoryId);
    createCategory({ name, type: 'category', publicationLifecycleId: '1' });
  };

  const handlePrevious = () => navigate(-1);

  useEffect(() => {
    if (isCreateCategSuccess) {
      createCategoryGrouping({
        higherLevelCategoryId: parentCategory,
        lowerLevelCategoryId: (createCategoryResponse as ICategory)?.id,
        publicationLifecycleId: (createCategoryResponse as ICategory)?.publicationLifecycleId,
      });
    }
  }, [isCreateCategSuccess]);

  useEffect(() => {
    handleCreateModalClose();
    setIsSnackbarOpen(isCreateCategGroupingSuccess);
    if (isCreateCategGroupingSuccess) refreshCategories();
  }, [isCreateCategGroupingSuccess]);

  useEffect(() => {
    if (!isRefreshFetching && isRefreshSuccess) {
      setTimeout(() => {
        dispatch(categoriesApi.util.resetApiState());
        refetch();
      }, 5000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

  useEffect(() => {
    if (createCategError && 'data' in createCategError) setErrMsg(String(createCategError?.data));
  }, [createCategError]);

  return (
    <MainContent paddingSide={92} paddingTop={42}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledBreadcrumbs aria-label="breadcrumb" withPadding={false}>
            <StyledTypography className="link" onClick={handlePrevious} data-testid="products-link">
              Products
            </StyledTypography>
            <StyledTypography color="text.primary">Categories</StyledTypography>
          </StyledBreadcrumbs>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="categories-header">
            Categories
          </StyledTitle>
        </ColAlignDiv>
        <RowAlignWrapper style={{ height: '54px' }}>
          <CategoryBtnWrapper rightmargin={20}>
            <StyledCategoryBtn
              data-testid="add-category-btn"
              className="add-category-btn"
              variant="contained"
              disableElevation
              height={40}
              onClick={handleAddCategory}
            >
              + Add category
            </StyledCategoryBtn>
          </CategoryBtnWrapper>
          <SearchField
            id="category-search-field"
            value={searchValue}
            onEnterPress={handleSearchDispatch}
            padding="16px 14px 14px"
          />
        </RowAlignWrapper>
      </RowAlignDiv>
      <Grid
        data={gridData}
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
          New category created successfully
        </Alert>
      </Snackbar>
      <CategoryDialog
        isOpen={isCreateModalOpen}
        handleClose={handleCreateModalClose}
        handleSubmit={handleCreateModalSubmit}
        errorMessage={errMsg}
        isLoading={isCreateCategLoading || isCreateCategGroupLoading}
      />
    </MainContent>
  );
};

export default Categories;
