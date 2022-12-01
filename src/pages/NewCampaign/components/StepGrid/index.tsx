import { useEffect, useState } from 'react';
import { Info } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid-pro';

// Components
import Grid from 'components/Grid';
import { categoriesColumns, productColumns } from 'components/Grid/constants';
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';

// Other variables / values
import { MessageWrapper, RowAlignWrapper, SpaceBetweenDiv, StyledCardTitle } from 'pages/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetAllCategoriesFilterQuery, useGetCategoriesQuery } from 'store/api/categories/api';
import {
  selectCategories,
  setCategoriesFilter,
  setCategoriesSearchValue,
  setCategoriesSelectedIds,
  setCategoriesSortValue,
} from 'store/api/categories/slice';
import { useGetAllProductFilterQuery, useGetProductsQuery } from 'store/api/products/api';
import {
  selectProducts,
  setProductsFilter,
  setProductsSearchValue,
  setProductsSelectedIds,
  setProductsSortValue,
} from 'store/api/products/slice';
import { IFacetValue, IFilterItem, IValue } from 'store/api/types';
import { IStepGrid } from './types';

const StepGrid = ({ stepType }: IStepGrid): JSX.Element => {
  // States
  const categoriesFilterInitState = generateFilterInitState(categoriesColumns);
  const productsFilterInitState = generateFilterInitState(productColumns);
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [productPageSize, setProductPageSize] = useState<number>(10);
  const [productPageSkip, setProductPageSkip] = useState<number>(0);
  const [categPageSize, setCategPageSize] = useState<number>(10);
  const [categPageSkip, setCategPageSkip] = useState<number>(0);
  const [menuData, setMenuData] = useState<IFacetValue>({} as IFacetValue);

  const dispatch = useAppDispatch();
  const {
    filterItem: productFilterItem = productsFilterInitState,
    searchValue: productSearchValue = '',
    selectedIds: selectedProductsIds,
    sortValue: productSortValue,
  } = useAppSelector(selectProducts);
  const {
    filterItem: categFilterItem = categoriesFilterInitState,
    searchValue: categSearchValue = '',
    selectedIds: selectedCategoriesIds,
    sortValue: categSortValue,
  } = useAppSelector(selectCategories);

  // Product API Call
  const { data: productData, isFetching: isProductFetching } = useGetProductsQuery(
    {
      searchString: productSearchValue,
      sortValue: productSortValue,
      filterItem: productFilterItem,
      prevPageItems: productPageSkip,
      pageSize: productPageSize,
    },
    {
      skip: stepType !== 'product',
    },
  );

  // Categories API Call
  const { data: categoryData, isFetching: isCategFetching } = useGetCategoriesQuery(
    {
      searchString: categSearchValue,
      sortValue: categSortValue,
      filterItem: categFilterItem,
      prevPageItems: categPageSkip,
      pageSize: categPageSize,
    },
    {
      skip: stepType !== 'category',
    },
  );

  // Product Filter Options
  const { data: productFilterOptions, isFetching: isProductFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: productSearchValue },
    { skip: !productData?.value?.length || stepType !== 'product' },
  );

  // Categories Filter Options
  const { data: categoryOptionsData, isFetching: isCategFilterOptionsFetching } = useGetAllCategoriesFilterQuery(
    { searchString: categSearchValue },
    { skip: !categoryData?.value.length || stepType !== 'category' },
  );

  const [rowCount, setRowCount] = useState<number>(0);

  useEffect(() => {
    let tempData;
    let tempRowCount;

    if (stepType === 'product' && productSearchValue.length > 2) {
      tempRowCount = productData?.['@odata.count'];
      tempData = productData?.value;
    } else if (stepType === 'category') {
      tempRowCount = categoryData?.['@odata.count'];
      tempData = categoryData?.value;
    }

    setRowCount(tempRowCount ?? 0);
    setGridData(tempData ?? []);
  }, [productData, categoryData, stepType]);

  useEffect(() => {
    let tempMenuData;

    if (stepType === 'product') {
      tempMenuData = {
        name: productFilterOptions?.['@search.facets']?.name,
      };
    } else if (stepType === 'category') {
      tempMenuData = {
        categoryName: categoryOptionsData?.['@search.facets']?.categoryName,
        parentName: categoryOptionsData?.['@search.facets']?.parentName,
      };
    }
    setMenuData((tempMenuData ?? {}) as IFacetValue);
  }, [isProductFilterOptionsFetching, isCategFilterOptionsFetching]);

  useEffect(() => {
    if (stepType === 'product' && productSearchValue.length < 3) {
      setGridData([]);
      setRowCount(0);
    }
  }, [productSearchValue]);

  const getInitialState = () => {
    let tempGridState;

    if (stepType === 'product') {
      tempGridState = {
        pagination: { pageSize: productPageSize },
        sorting: { sortModel: [{ field: 'name', sort: 'asc' as GridSortDirection }] },
      };
    } else {
      tempGridState = {
        pagination: { pageSize: categPageSize },
        sorting: { sortModel: [{ field: 'categoryName', sort: 'asc' as GridSortDirection }] },
      };
    }

    return tempGridState;
  };

  const getColHeader = () => {
    return stepType === 'product' ? productColumns : categoriesColumns;
  };

  const getHeaderLabel = () => {
    if (stepType === 'product') return 'products';
    else return 'category';
  };

  const getSearchFieldValue = () => {
    if (stepType === 'product') return productSearchValue;
    else return categSearchValue;
  };

  const getSearchFieldPlaceholder = () => {
    if (stepType === 'product') return 'product name and barcode';
    else return 'category name';
  };

  const getSelectedIds = () => {
    if (stepType === 'product') return selectedProductsIds;
    else return selectedCategoriesIds;
  };

  const getFilterValue = () => {
    if (stepType === 'product') return productFilterItem;
    else return categFilterItem;
  };

  const getDataIdKey = () => {
    if (stepType === 'product') return 'id';
    else return 'lowerLevelCategoryId';
  };

  const handleSearchDispatch = (searchValue: string) => {
    if (stepType === 'product') {
      setProductPageSkip(0);
      dispatch(setProductsFilter(productsFilterInitState));
      dispatch(setProductsSearchValue(searchValue));

      if (searchValue === '') {
        setGridData([]);
        setRowCount(0);
      }
    } else if (stepType === 'category') {
      setCategPageSkip(0);
      dispatch(setCategoriesFilter(categoriesFilterInitState));
      dispatch(setCategoriesSearchValue(searchValue));
    }
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    if (stepType === 'product') {
      dispatch(setProductsFilter(model.items as IFilterItem[]));
    } else if (stepType === 'category') {
      dispatch(setCategoriesFilter(model.items as IFilterItem[]));
    }
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    if (stepType === 'product') dispatch(setProductsSelectedIds(selectionModel as string[]));
    else if (stepType === 'category') dispatch(setCategoriesSelectedIds(selectionModel as string[]));
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

    if (stepType === 'product') {
      setProductPageSkip(0);
      dispatch(setProductsFilter(newAppliedFilters));
    } else if (stepType === 'category') {
      setCategPageSkip(0);
      dispatch(setCategoriesFilter(newAppliedFilters));
    }
  };

  const onPageChange = (page: number) => {
    if (stepType === 'category') setCategPageSkip(page * categPageSize);
    else if (stepType === 'product') setProductPageSkip(page * productPageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    if (stepType === 'category') setCategPageSize(pageSize);
    else if (stepType === 'product') setProductPageSize(pageSize);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    if (stepType === 'category') {
      dispatch(
        setCategoriesSortValue({
          field: model[0]?.field,
          sort: model[0]?.sort,
        }),
      );
    } else if (stepType === 'product') {
      dispatch(
        setProductsSortValue({
          field: model[0]?.field,
          sort: model[0]?.sort,
        }),
      );
    }
  };

  const renderSelectedCount = () => {
    if (
      (stepType === 'product' && selectedProductsIds?.length === 0) ||
      (stepType === 'category' && selectedCategoriesIds?.length === 0)
    )
      return;
    let count;
    let focus;
    if (stepType === 'category') {
      count = selectedCategoriesIds?.length ?? 0;
      focus = count > 1 ? 'categories ' : 'category';
    } else {
      count = selectedProductsIds?.length ?? 0;
      focus = count > 1 ? 'products' : 'product';
    }

    return (
      <MessageWrapper color="#006492">
        {count} {focus} selected
      </MessageWrapper>
    );
  };

  return (
    <div>
      <SpaceBetweenDiv withmargin={false}>
        <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600, lineHeight: '40px', margin: '0' }}>
          <SpaceBetweenDiv withmargin={false}>
            <RowAlignWrapper>
              Select {getHeaderLabel()}
              <Tooltip title={`Select the ${getHeaderLabel()} to be included in your campaign`} placement="top">
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
              </Tooltip>
              {renderSelectedCount()}
            </RowAlignWrapper>
          </SpaceBetweenDiv>
        </StyledCardTitle>
        <div className="select-focus" style={{ height: '40px' }}>
          <SearchField
            id="focus-search-field"
            value={getSearchFieldValue()}
            onEnterPress={handleSearchDispatch}
            isfullsize={false}
            width={266}
            padding="8px 12px 8px 0"
            variant="outlined"
            placeholder={`Search by ${getSearchFieldPlaceholder()}`}
          />
        </div>
      </SpaceBetweenDiv>
      <Grid
        data={gridData}
        columns={getColHeader()}
        id="view-focus-mini-grid"
        dataIdKey={getDataIdKey()}
        isFetching={isProductFetching || isCategFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={getFilterValue()}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={getInitialState()}
        withBorder={false}
        isMenuLoading={isProductFilterOptionsFetching || isCategFilterOptionsFetching}
        withPadding={false}
        withCheckboxSelection={true}
        rowHeight={40}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={getSelectedIds()}
        hideFooterSelectedRowCount={true}
      />
    </div>
  );
};

export default StepGrid;
