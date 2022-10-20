import { useEffect, useState } from 'react';
import { Info } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { GridFilterModel, GridSelectionModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import Grid from 'components/Grid';
import { categoriesColumns, productColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import { MessageWrapper, RowAlignWrapper, SpaceBetweenDiv, StyledCardTitle } from 'pages/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { initialState } from 'store/api/constants';
import { useGetAllCategoriesFilterQuery, useGetCategoriesQuery } from 'store/api/categories/api';
import { categoryInitialState } from 'store/api/categories/initialState';
import { selectCategories, setCategoriesSelectedIds } from 'store/api/categories/slice';
import { useGetAllProductFilterQuery, useGetProductsQuery } from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';
import { selectProducts, setProductsSelectedIds } from 'store/api/products/slice';
import { IFacetValue, IFilterItem, ISortItem, IValue } from 'store/api/types';
import { IStepGrid } from './types';

const StepGrid = ({ stepType }: IStepGrid): JSX.Element => {
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [searchVal, setSearchVal] = useState<string>('');
  const [filterVal, setFilterVal] = useState<IFilterItem>(initialState.filterItem);
  const [sortVal, setSortVal] = useState<ISortItem>(initialState.sortValue);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSkip, setPageSkip] = useState<number>(0);
  const [menuData, setMenuData] = useState<IFacetValue>({} as IFacetValue);

  const dispatch = useAppDispatch();
  const { selectedIds: selectedProductsIds } = useAppSelector(selectProducts);
  const { selectedIds: selectedCategoriesIds } = useAppSelector(selectCategories);

  // Product API Call
  const { data: productData, isFetching: isProductFetching } = useGetProductsQuery(
    {
      searchString: searchVal,
      sortValue: sortVal,
      filterItem: filterVal,
      prevPageItems: pageSkip,
      pageSize,
    },
    {
      skip: stepType !== 'product',
    },
  );

  // Categories API Call
  const { data: categoryData, isFetching: isCategFetching } = useGetCategoriesQuery(
    {
      searchString: searchVal,
      sortValue: sortVal,
      filterItem: filterVal,
      prevPageItems: pageSkip,
      pageSize,
    },
    {
      skip: stepType !== 'category',
    },
  );

  // Product Filter Options
  const { data: productFilterOptions, isFetching: isProductFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: searchVal },
    { skip: !gridData.length || stepType !== 'product' },
  );

  // Categories Filter Options
  const { data: categoryOptionsData, isFetching: isCategFilterOptionsFetching } = useGetAllCategoriesFilterQuery(
    { searchString: searchVal },
    { skip: !gridData.length || stepType !== 'category' },
  );

  const [rowCount, setRowCount] = useState<number>(0);

  useEffect(() => {
    let tempData;
    let tempRowCount;

    if (stepType === 'product' && searchVal.length > 2) {
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
    if (stepType === 'product') {
      setFilterVal(productInitialState.filterItem);
      setSortVal(productInitialState.sortValue);
      setSearchVal('');
    } else if (stepType === 'category') {
      setFilterVal(categoryInitialState.filterItem);
      setSortVal(categoryInitialState.sortValue);
      setSearchVal('');
    }
  }, [stepType]);

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
    if (stepType === 'product' && searchVal.length < 3) {
      setGridData([]);
      setRowCount(0);
    }
  }, [searchVal]);

  const getInitialState = () => {
    const initialGridState = {
      pagination: { pageSize },
      sorting: { sortModel: [{ field: 'name', sort: 'asc' as GridSortDirection }] },
    };
    if (stepType === 'product') {
      return {
        ...initialGridState,
        sorting: { sortModel: [{ field: 'name', sort: 'asc' as GridSortDirection }] },
      };
    } else if (stepType === 'category') {
      return {
        ...initialGridState,
        sorting: { sortModel: [{ field: 'categoryName', sort: 'asc' as GridSortDirection }] },
      };
    }
  };

  const getColHeader = () => {
    if (stepType === 'product') return productColumns;
    else return categoriesColumns;
  };

  const getHeaderLabel = () => {
    if (stepType === 'product') return 'products';
    else if (stepType === 'category') return 'category';
    else return 'stores';
  };

  const getSearchFieldPlaceholder = () => {
    if (stepType === 'product') return 'product name and barcode';
    else if (stepType === 'category') return 'category name';
    else return 'store name and address';
  };

  const getSelectedIds = () => {
    if (stepType === 'product') return selectedProductsIds;
    else if (stepType === 'category') return selectedCategoriesIds;
  };

  const handleSearchDispatch = (searchValue: string) => {
    setSearchVal(searchValue);
    if (searchValue === '') {
      setGridData([]);
      setRowCount(0);
    }
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    setFilterVal({
      columnField: model.items[0].columnField,
      value: model.items[0].value,
      operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
    });
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    if (stepType === 'product') dispatch(setProductsSelectedIds(selectionModel as string[]));
    else if (stepType === 'category') dispatch(setCategoriesSelectedIds(selectionModel as string[]));
  };

  const handleOnFilterClick = (value: string, currColumn: string, filters: IBasicFilter) => {
    if (!value) return;

    const combinedValue =
      filters.field === currColumn && Array.isArray(filters.value)
        ? handleFilterStateChange(value, filters.value)
        : [value];

    setFilterVal({
      columnField: currColumn,
      value: combinedValue,
      operatorValue: 'isAnyOf',
    });
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
            value={searchVal}
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
        isFetching={isProductFetching || isCategFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={filterVal}
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
