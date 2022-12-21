import { useEffect, useState } from 'react';
import { DialogActions, DialogTitle, IconButton } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid-pro';
import { Close } from '@mui/icons-material';

// Components
import Grid from 'components/Grid';
import SearchField from 'components/SearchField';

// Constants
import { addLinkedProductsColumns } from 'components/Grid/constants';

// Store / APIs
import {
  useLazyGetAllProductFilterQuery,
  useLazyGetProductsQuery,
  useUpdateLinkedProductsMutation,
} from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';

// Styles
import { RowAlignWrapper, StyledCategoryBtn, StyledDialog } from 'pages/styles';
import { StyledDialogContent } from './styles';

// Types
import { IFacetValue, IFilterItem, ISortItem, IValue } from 'store/api/types';
import { IAddLinkedProductsProps } from './types';

// Utils
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import { renderLoader } from 'pages/utils';

const AddLinkedProductsDialog = ({
  isOpen,
  handleClose,
  baseCategory,
  categoryId,
  linkedProducts,
}: IAddLinkedProductsProps): JSX.Element => {
  // States
  const addProductsFilterInitState = generateFilterInitState(addLinkedProductsColumns);
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [menuData, setMenuData] = useState<IFacetValue>({} as IFacetValue);
  // Local states for Add Linked Products grid
  const [linkedProdSearchVal, setLinkedProdSearchVal] = useState<string>('');
  const [linkedProdSortVal, setLinkedProdSortVal] = useState<ISortItem>(productInitialState.sortValue);
  const [linkedProdFilterVal, setLinkedProdFilterVal] = useState<IFilterItem[]>(addProductsFilterInitState);
  const [linkedProdSelectedProds, setLinkedProdSelectedProds] = useState<string[]>([]);

  const [getNotLinkedProducts, { data, isFetching, isSuccess }] = useLazyGetProductsQuery();
  const [
    getNotLinkedProductsFilterOptions,
    { data: filterOptionsData, isFetching: isFilterOptionsFetching, isSuccess: isFilterOptionsSuccess },
  ] = useLazyGetAllProductFilterQuery();
  const [updateLinkedProducts, { isLoading: isUpdateProductsLoading }] = useUpdateLinkedProductsMutation({
    fixedCacheKey: 'update-linked-products-mutation',
  });

  const initialGridState = {
    sorting: { sortModel: [{ field: 'name', sort: 'asc' as GridSortDirection }] },
  };

  useEffect(() => {
    if (isOpen && linkedProdSearchVal.length > 2) {
      getNotLinkedProducts({
        searchString: linkedProdSearchVal,
        sortValue: linkedProdSortVal,
        filterItem: linkedProdFilterVal,
        prevPageItems: 0,
        pageSize: 100,
        baseCategory,
        isNotLinkedProducts: true,
      });
      getNotLinkedProductsFilterOptions({
        searchString: linkedProdSearchVal,
        selectedCategory: baseCategory,
        isNotLinkedProducts: true,
      });
    } else if (isOpen && linkedProdSearchVal.length < 3) {
      setGridData([]);
      setMenuData({} as IFacetValue);
    }

    if (!isOpen) {
      setLinkedProdSearchVal('');
      setLinkedProdSortVal(productInitialState.sortValue);
      setLinkedProdFilterVal(productInitialState.filterItem);
      setLinkedProdSelectedProds([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && linkedProdSearchVal.length > 2) setGridData(data?.value ?? []);
  }, [data, isSuccess, isOpen]);

  useEffect(() => {
    if (isOpen && linkedProdSearchVal.length > 2) {
      const tempMenuData = {
        name: filterOptionsData?.['@search.facets']?.name,
        barcodeNumber: filterOptionsData?.['@search.facets']?.barcodeNumber,
      } as IFacetValue;
      setMenuData(tempMenuData);
    }
  }, [filterOptionsData, isFilterOptionsSuccess, isOpen]);

  const handleUpdateProducts = () => {
    updateLinkedProducts({
      categoryId,
      productIds: [...linkedProducts, ...linkedProdSelectedProds],
      publicationLifecycleId: '1',
    });
  };

  const handleModalClose = () => {
    handleClose();
  };

  const handleModalSubmit = () => {
    handleUpdateProducts();
  };

  const handleSearchChange = (searchValue: string) => {
    setLinkedProdSearchVal(searchValue);
    setLinkedProdFilterVal(addProductsFilterInitState);

    if (searchValue.length > 2) {
      getNotLinkedProducts({
        searchString: searchValue,
        sortValue: linkedProdSortVal,
        filterItem: linkedProdFilterVal,
        prevPageItems: 0,
        pageSize: 100,
        baseCategory,
        isNotLinkedProducts: true,
      });
      getNotLinkedProductsFilterOptions({
        searchString: searchValue,
        selectedCategory: baseCategory,
        isNotLinkedProducts: true,
      });
    } else {
      setGridData([]);
      setMenuData({} as IFacetValue);
    }
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    setLinkedProdFilterVal(model.items as IFilterItem[]);
  };

  const handleOnFilterClick = (value: string, currColumn: string, currFilterItems: IFilterItem[]) => {
    if (!value) return;

    const columnValues = currFilterItems.find((filter) => filter.columnField === currColumn);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    const newAppliedFilters = currFilterItems.map((filter) => {
      if (filter.columnField === currColumn)
        return {
          ...filter,
          value: combinedValue,
        };
      else return filter;
    });

    setLinkedProdFilterVal(newAppliedFilters);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    setLinkedProdSortVal({
      field: model[0]?.field,
      sort: model[0]?.sort,
    });
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    setLinkedProdSelectedProds(selectionModel as string[]);
  };

  const renderLinkedProducts = () => {
    return (
      <div>
        <div className="linked-products-modal" style={{ marginBottom: '24px' }}>
          <SearchField
            id="linked-prod-modal-search-field"
            value={linkedProdSearchVal}
            onChange={handleSearchChange}
            padding="8px 12px 8px 0"
            variant="outlined"
            placeholder="Search by product name or barcode"
          />
        </div>
        <div className="label-div">
          <span className="row-label">Search results</span>
        </div>
        <Grid
          data={gridData}
          columns={addLinkedProductsColumns}
          id="add-linked-products-grid"
          dataIdKey="id"
          isFetching={isFetching}
          onFilterModelChange={onFilterModelChange}
          filterItem={linkedProdFilterVal}
          handleOnFilterClick={handleOnFilterClick}
          menuData={menuData as IFacetValue}
          onSortModelChange={handleSortModelChange}
          initialState={initialGridState}
          isMenuLoading={isFilterOptionsFetching}
          withPadding={false}
          withCheckboxSelection={true}
          withBorder={true}
          borderColor="rgba(0,0,0,0.24)"
          rowHeight={48}
          onSelectionModelChange={onSelectionModelChange}
          selectionModel={linkedProdSelectedProds}
          hideFooter={true}
        />
      </div>
    );
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        Add products to category
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            right: 32,
            top: 32,
            color: '#1c1b1f',
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
    );
  };

  const renderActionButtons = () => {
    return (
      <RowAlignWrapper>
        <StyledCategoryBtn
          data-testid="add-linked-products-btn"
          className="add-linked-products-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
          disabled={linkedProdSelectedProds.length === 0 || isUpdateProductsLoading}
        >
          {isUpdateProductsLoading ? renderLoader('34px', 17, 6) : 'Done'}
        </StyledCategoryBtn>
      </RowAlignWrapper>
    );
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleModalClose}
      maxWidth="xl"
      fullWidth={true}
      transitionDuration={300}
      data-testid="add-linked-products-modal"
      keepMounted
      dialogWidth={856}
    >
      {renderDialogTitle()}
      <StyledDialogContent className="dialog-content">{renderLinkedProducts()}</StyledDialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default AddLinkedProductsDialog;
