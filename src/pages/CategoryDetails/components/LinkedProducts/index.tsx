import { useCallback, useEffect, useState } from 'react';
import { Info, PlaylistAdd } from '@mui/icons-material';
import { Alert, CircularProgress, IconButton, Snackbar, Tooltip } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid-pro';

// Components
import Grid from 'components/Grid';
import { linkedProductsColumns } from 'components/Grid/constants';
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { tooltipContent } from '../CategoryInfoPanel/constants';
import AddLinkedProductsDialog from '../AddLinkedProductsDialog';

// Other variables / values
import {
  CategoryBtnWrapper,
  CircularLoaderWrapper,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCardTitle,
  StyledCategoryBtn,
} from 'pages/styles';
import { useAppDispatch } from 'store';
import {
  productsApi,
  useGetAllProductFilterQuery,
  useGetProductsQuery,
  useLazyRefreshProductsQuery,
  useUpdateLinkedProductsMutation,
} from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';
import { IFacetValue, IFilterItem, ISortItem, IValue } from 'store/api/types';

const LinkedProducts = ({
  categoryName,
  parentCategory,
  categoryId,
}: {
  categoryName: string;
  parentCategory: string;
  categoryId: string;
}): JSX.Element => {
  // States
  const linkedProductsFilterInitState = generateFilterInitState(linkedProductsColumns);
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [searchVal, setSearchVal] = useState<string>('');
  const [filterVal, setFilterVal] = useState<IFilterItem[]>(linkedProductsFilterInitState);
  const [sortVal, setSortVal] = useState<ISortItem>(productInitialState.sortValue);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [linkedProducts, setLinkedProducts] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);
  const [isAddLinkedProductsModalOpen, setIsAddLinkedProductsModalOpen] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [linkedProdSelectedProds, setLinkedProdSelectedProds] = useState<string[]>([]);
  const [isUpdateDelete, setIsUpdateDelete] = useState<boolean>(false);
  const [showRemoveBtn, setShowRemoveBtn] = useState<boolean>(false);
  const [isFetchingUpdates, setIsFetchingUpdates] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { data, isFetching, refetch } = useGetProductsQuery({
    searchString: searchVal,
    sortValue: sortVal,
    filterItem: filterVal,
    prevPageItems: pageSkip,
    pageSize,
    selectedCategories,
    baseCategory: categoryName,
  });

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: searchVal, parentCategory, selectedCategory: categoryName },
    { skip: !gridData.length },
  );

  const [
    updateLinkedProducts,
    { isSuccess: isUpdateProductsSuccess, isLoading: isUpdateProductsLoading, reset: resetUpdateProducts },
  ] = useUpdateLinkedProductsMutation({
    fixedCacheKey: 'update-linked-products-mutation',
  });

  const [refreshProducts, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] =
    useLazyRefreshProductsQuery();

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

  const renderLoader = (height: number) => (
    <CircularLoaderWrapper height={`${height}px`}>
      <CircularProgress size={height / 2} thickness={6} />
    </CircularLoaderWrapper>
  );

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    setFilterVal(linkedProductsFilterInitState);
    setSearchVal(searchValue);
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    setFilterVal(model.items as IFilterItem[]);
  };

  const handleOnFilterClick = (value: string, currColumn: string, currFilterItems: IFilterItem[]) => {
    if (!value) return;

    const columnValues = currFilterItems.find((filter) => filter.columnField === currColumn);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    setPageSkip(0);

    if (currColumn === 'categories') setSelectedCategories([...combinedValue]);
    else {
      const newAppliedFilters = currFilterItems.map((filter) => {
        if (filter.columnField === currColumn)
          return {
            ...filter,
            value: combinedValue,
          };
        else return filter;
      });
      setSelectedCategories([]);
      setFilterVal(newAppliedFilters);
    }
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

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    setLinkedProdSelectedProds(selectionModel as string[]);
    if (selectionModel.length > 0) setShowRemoveBtn(true);
    else setShowRemoveBtn(false);
  };

  const handleAddLinkedProductsModalOpen = () => {
    setIsAddLinkedProductsModalOpen(true);
  };

  const handleAddLinkedProductsModalClose = () => {
    setIsAddLinkedProductsModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    resetUpdateProducts();
    if (isUpdateDelete) setIsUpdateDelete(false);
  };

  const handleRemoveProducts = () => {
    const includedIds: string[] = linkedProducts.filter((linkedId) => !linkedProdSelectedProds.includes(linkedId));
    setLinkedProducts(includedIds);
    setIsUpdateDelete(true);

    updateLinkedProducts({
      categoryId,
      productIds: includedIds,
      publicationLifecycleId: '1',
    });
  };

  const getSnackbarMsg = useCallback(() => {
    let msg;
    if (isUpdateDelete) msg = 'Product links removed successfully';
    else msg = 'Products linked successfully';

    return msg;
  }, [isUpdateDelete]);

  // Use Effects
  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
    setGridData(data?.value ?? []);
    const tempLinkedProducts: string[] = [];
    data?.value.forEach((product) => tempLinkedProducts.push(String(product.id)));
    setLinkedProducts(tempLinkedProducts);
    setLinkedProdSelectedProds([]);
    setShowRemoveBtn(false);
  }, [data]);

  useEffect(() => {
    setSelectedCategories([]);
  }, [categoryName]);

  useEffect(() => {
    setIsSnackbarOpen(isUpdateProductsSuccess);
    if (isUpdateProductsSuccess) {
      if (isUpdateDelete) setShowRemoveBtn(false);
      else if (!isUpdateDelete) handleAddLinkedProductsModalClose();
      refreshProducts();
    }
  }, [isUpdateProductsSuccess]);

  useEffect(() => {
    if (!isRefreshFetching && isRefreshSuccess) {
      setIsFetchingUpdates(true);
      setRowCount(0);
      setGridData([]);
      setTimeout(() => {
        dispatch(productsApi.util.resetApiState());
        refetch();
        if (isUpdateDelete) setLinkedProdSelectedProds([]);
        setIsFetchingUpdates(false);
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

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
            <IconButton
              aria-label="Add category"
              size="small"
              style={{ marginLeft: '4px' }}
              onClick={handleAddLinkedProductsModalOpen}
            >
              <PlaylistAdd fontSize="inherit" />
            </IconButton>
          </SpaceBetweenDiv>
        </StyledCardTitle>
        <RowAlignWrapper className="linked-products">
          {showRemoveBtn && (
            <CategoryBtnWrapper rightmargin={12}>
              <StyledCategoryBtn
                data-testid="remove-product"
                variant="contained"
                disableElevation
                height={40}
                onClick={handleRemoveProducts}
                disabled={isUpdateProductsLoading}
              >
                {isUpdateProductsLoading ? renderLoader(34) : 'Remove from category'}
              </StyledCategoryBtn>
            </CategoryBtnWrapper>
          )}
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
        </RowAlignWrapper>
      </SpaceBetweenDiv>
      <Grid
        data={gridData}
        columns={linkedProductsColumns}
        id="view-products-mini-grid"
        dataIdKey="id"
        isFetching={isFetching || isFetchingUpdates}
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
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={linkedProdSelectedProds}
        rowHeight={52}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {getSnackbarMsg()}
        </Alert>
      </Snackbar>
      <AddLinkedProductsDialog
        isOpen={isAddLinkedProductsModalOpen}
        handleClose={handleAddLinkedProductsModalClose}
        baseCategory={categoryName}
        categoryId={categoryId}
        linkedProducts={linkedProducts}
      />
    </div>
  );
};

export default LinkedProducts;
