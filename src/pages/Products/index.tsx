import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { GridFilterModel, GridRowParams, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

// Components
import Grid from 'components/Grid';
import { productColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import CategoryList from './components/CategoryList';
import AddProductDialog from './components/AddProductDialog';

// Other variables / values
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IValue } from 'store/api/types';
import {
  productsApi,
  productsMicroService,
  useAddProductMutation,
  useGetAllProductCountQuery,
  useGetAllProductFilterQuery,
  useGetParentCategoriesQuery,
  useGetProductsQuery,
  useLazyRefreshProductsQuery,
} from 'store/api/products/api';
import {
  resetToInitialState,
  selectProducts,
  setProductsFilter,
  setProductsSearchValue,
  setProductsSelectedCategories,
  setProductsSelectedParent,
  setProductsSortValue,
} from 'store/api/products/slice';
import { IProductDialogData } from 'store/api/products/types';
import {
  CategoryBtnWrapper,
  ColAlignDiv,
  MainContent,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCategoryBtn,
  StyledSubtitle,
  StyledTitle,
} from '../styles';

const Products: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  // States
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [allProductCount, setAllProductCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const dispatch = useAppDispatch();
  const {
    filterItem,
    searchValue = '',
    selectedCategories = [],
    selectedParent,
    sortValue,
  } = useAppSelector(selectProducts);
  const { data, isFetching, refetch } = useGetProductsQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
    parentCategory: selectedParent,
    selectedCategories,
  });

  const { data: allProductData, refetch: refetchParentCategories } = useGetAllProductCountQuery();

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: searchValue, parentCategory: selectedParent },
    { skip: !gridData.length },
  );

  const { data: parentCategories } = useGetParentCategoriesQuery();

  const [refreshProducts, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] =
    useLazyRefreshProductsQuery();

  const [parentCategoryData, setParentCategoryData] = useState<IValue[]>(parentCategories?.items ?? []);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [
    addProduct,
    { isSuccess: isAddProductSuccess, error: addProductError, reset: resetAddProduct, isLoading: isAddProductLoading },
  ] = useAddProductMutation();

  const menuData = {
    name: filterOptionsData?.['@search.facets']?.name,
    barcodeNumber: filterOptionsData?.['@search.facets']?.barcodeNumber,
    categories: filterOptionsData?.['@search.facets']?.['categories/name'],
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'name', sort: 'asc' as GridSortDirection }] },
  };

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(
      setProductsFilter({
        columnField: '',
        value: '',
        operatorValue: 'isAnyOf',
      }),
    );
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
    setPage(page);
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

    if (currColumn === 'categories') dispatch(setProductsSelectedCategories(combinedValue));
    else dispatch(setProductsSelectedCategories([]));

    setPageSkip(0);
    setPage(0);
    dispatch(
      setProductsFilter({
        columnField: currColumn,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  const handleOnRowClick = (params: GridRowParams) => {
    navigate(`${params.id}`, { replace: false, state: { rowData: params.row } });
  };

  const handleOnMangeCategories = () => {
    navigate('categories', { replace: false });
  };

  const handleParentCategoryChange = (category: IValue) => {
    dispatch(setProductsSelectedParent(String(category?.id)));
    setPageSkip(0);
    setPage(0);
    dispatch(resetToInitialState());
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setErrMsg('');
  };

  const handleAddProductSubmit = (productData: IProductDialogData) => {
    addProduct({ ...productData, publicationLifecycleId: '1' });
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    resetAddProduct();
  };

  // Use Effects
  useEffect(() => {
    if (
      (selectedParent !== 'all' && selectedParent !== 'uncategorised') ||
      (selectedParent === 'all' && searchValue.length > 2) ||
      (selectedParent === 'uncategorised' && searchValue.length > 2)
    ) {
      setRowCount(data?.['@odata.count'] ?? 0);
      setGridData(data?.value ?? []);
    } else {
      setGridData([]);
      setRowCount(0);
    }
  }, [data]);

  useEffect(() => {
    setAllProductCount(allProductData?.['@odata.count'] ?? 0);
  }, [allProductData]);

  useEffect(() => {
    let sortedData = parentCategories?.items?.slice() ?? [];
    sortedData?.sort((a, b) => {
      if (a.categoryName < b.categoryName) return -1;
      if (a.categoryName > b.categoryName) return 1;
      return 0;
    });

    const categoryProductCount = sortedData.reduce((total, currValue) => total + Number(currValue.productCount), 0);

    const allCategory = {
      categoryName: 'All',
      id: 'all',
      productCount: allProductCount,
    };

    const uncategorisedCategory = {
      categoryName: 'Uncategorised',
      id: 'uncategorised',
      productCount: allProductCount - categoryProductCount,
    };

    sortedData = [allCategory, ...sortedData, uncategorisedCategory];

    setParentCategoryData(sortedData ?? []);
  }, [allProductCount, parentCategories]);

  useEffect(() => {
    setIsSnackbarOpen(isAddProductSuccess);
    if (isAddProductSuccess) {
      handleAddModalClose();
      refreshProducts();
    }
  }, [isAddProductSuccess]);

  useEffect(() => {
    if (!isRefreshFetching && isRefreshSuccess) {
      setTimeout(() => {
        dispatch(productsApi.util.resetApiState());
        dispatch(productsMicroService.util.resetApiState());
        refetch();
        refetchParentCategories();
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

  useEffect(() => {
    if (addProductError && 'data' in addProductError) setErrMsg(String(addProductError?.data));
  }, [addProductError]);

  return (
    <MainContent paddingSide={32} paddingTop={42}>
      <SpaceBetweenDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="products-header">
            Products
          </StyledTitle>
          <StyledSubtitle variant="subtitle1" gutterBottom paddingBottom={33}></StyledSubtitle>
        </ColAlignDiv>
        <RowAlignWrapper style={{ height: '54px' }}>
          <CategoryBtnWrapper rightmargin={20}>
            <StyledCategoryBtn
              data-testid="add-products-btn"
              className="add-products-btn"
              variant="contained"
              disableElevation
              height={40}
              onClick={handleAddProduct}
            >
              + Add product
            </StyledCategoryBtn>
          </CategoryBtnWrapper>
          <SearchField
            id="category-search-field"
            value={searchValue}
            isfullsize={false}
            width={321}
            onEnterPress={handleSearchDispatch}
            padding="16px 14px 14px"
          />
        </RowAlignWrapper>
      </SpaceBetweenDiv>
      <RowAlignWrapper>
        <CategoryList
          onManageCategoriesClick={handleOnMangeCategories}
          sortedData={parentCategoryData}
          handleParentCategoryClick={handleParentCategoryChange}
        />
        <div style={{ height: 'fit-content', width: 'calc(100vw - 617px)' }}>
          <Grid
            data={gridData}
            columns={productColumns}
            id={`view-products-grid-${selectedParent}`}
            dataIdKey="id"
            isFetching={isFetching}
            onFilterModelChange={onFilterModelChange}
            filterItem={filterItem}
            handleOnFilterClick={handleOnFilterClick}
            rowCount={rowCount}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            menuData={menuData as IFacetValue}
            onSortModelChange={handleSortModelChange}
            initialState={initialGridState}
            onRowClick={handleOnRowClick}
            isMenuLoading={isFilterOptionsFetching}
            page={page}
          />
        </div>
      </RowAlignWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          Product has been successfully created
        </Alert>
      </Snackbar>
      <AddProductDialog
        isOpen={isAddModalOpen}
        handleClose={handleAddModalClose}
        handleSubmit={handleAddProductSubmit}
        errorMessage={errMsg}
        isLoading={isAddProductLoading}
      />
    </MainContent>
  );
};

export default Products;
