import { useEffect, useState } from 'react';
import { CircularProgress, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import { Close } from '@mui/icons-material';

import Grid from 'components/Grid';
import { addLinkedProductsColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { CircularLoaderWrapper, RowAlignWrapper, StyledCategoryBtn } from 'pages/styles';
import { useLazyGetAllProductFilterQuery, useLazyGetProductsQuery } from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';
import { IFacetValue, IFilterItem, ISortItem } from 'store/api/types';
import { StyledDialog, StyledDialogContent } from './styles';
import { IAddLinkedProductsProps } from './types';

const AddLinkedProductsDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  isLoading,
  baseCategory,
}: IAddLinkedProductsProps): JSX.Element => {
  const [linkedProdSearchVal, setLinkedProdSearchVal] = useState<string>('');
  const [linkedProdSortVal, setLinkedProdSortVal] = useState<ISortItem>(productInitialState.sortValue);
  const [linkedProdFilterVal, setLinkedProdFilterVal] = useState<IFilterItem>(productInitialState.filterItem);
  const [linkedProdSelectedProds, setLinkedProdSelectedProds] = useState<string[]>([]);

  const [getNotLinkedProducts, { data, isFetching }] = useLazyGetProductsQuery();
  const [getNotLinkedProductsFilterOptions, { data: filterOptionsData, isFetching: isFilterOptionsFetching }] =
    useLazyGetAllProductFilterQuery();

  const menuData = {
    name: filterOptionsData?.['@search.facets']?.name,
    barcodeNumber: filterOptionsData?.['@search.facets']?.barcodeNumber,
  };

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
    }
    if (!isOpen) {
      setLinkedProdSearchVal('');
      setLinkedProdSortVal(productInitialState.sortValue);
      setLinkedProdFilterVal(productInitialState.filterItem);
    }
  }, [isOpen]);

  const handleModalClose = () => {
    handleClose();
  };

  const handleModalSubmit = () => {
    //handleSubmit({ name: categoryName, higherLevelCategoryId: parentCategory });
    handleModalClose();
  };

  const handleSearchChange = (searchValue: string) => {
    setLinkedProdSearchVal(searchValue);

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
    }
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    setLinkedProdFilterVal({
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

    setLinkedProdFilterVal({
      columnField: currColumn,
      value: combinedValue,
      operatorValue: 'isAnyOf',
    });
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

  const renderLoader = (height: number) => (
    <CircularLoaderWrapper height={`${height}px`}>
      <CircularProgress size={height / 2} thickness={6} />
    </CircularLoaderWrapper>
  );

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
          data={data?.value}
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
          disabled={true}
        >
          {isLoading ? renderLoader(34) : 'Done'}
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
    >
      {renderDialogTitle()}
      <StyledDialogContent className="dialog-content">{renderLinkedProducts()}</StyledDialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default AddLinkedProductsDialog;
