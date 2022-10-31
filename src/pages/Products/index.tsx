import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridFilterModel, GridRowParams, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

// Components
import Grid from 'components/Grid';
import { productColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import CategoryList from './components/CategoryList';

// Other variables / values
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IValue } from 'store/api/types';
import { useGetCategoriesUnderParentCategoryQuery } from 'store/api/categories/api';
import { useGetAllProductFilterQuery, useGetProductsQuery } from 'store/api/products/api';
import {
  selectProducts,
  setProductsFilter,
  setProductsSearchValue,
  setProductsSelectedCategories,
  setProductsSortValue,
} from 'store/api/products/slice';
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
  const { data, isFetching } = useGetProductsQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
    parentCategory: selectedParent,
    selectedCategories,
  });

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: searchValue, parentCategory: selectedParent },
    { skip: !gridData.length },
  );

  const { data: categoryData, isFetching: isCategoryFetching } = useGetCategoriesUnderParentCategoryQuery(
    {
      parentCategory: selectedParent,
    },
    { skip: selectedParent === '' },
  );

  const menuData = {
    name: filterOptionsData?.['@search.facets']?.name,
    barcodeNumber: filterOptionsData?.['@search.facets']?.barcodeNumber,
    categories: categoryData?.['@search.facets']?.categoryName,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'name', sort: 'asc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    if (searchValue !== '' || selectedParent !== '') {
      setRowCount(data?.['@odata.count'] ?? 0);
      setGridData(data?.value ?? []);
    } else {
      setGridData([]);
      setRowCount(0);
    }
  }, [data]);

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

    if (currColumn === 'categories') {
      dispatch(setProductsSelectedCategories(combinedValue));
    }

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

  const handleParentCategoryChange = () => {
    setPageSkip(0);
    setPage(0);
    dispatch(setProductsSelectedCategories([]));
    dispatch(
      setProductsFilter({
        columnField: '',
        value: [],
        operatorValue: 'isAnyOf',
      }),
    );
  };

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
            >
              + Add products
            </StyledCategoryBtn>
          </CategoryBtnWrapper>
          <SearchField
            id="category-search-field"
            value={searchValue}
            onEnterPress={handleSearchDispatch}
            padding="16px 14px 14px"
          />
        </RowAlignWrapper>
      </SpaceBetweenDiv>
      <RowAlignWrapper>
        <CategoryList
          onManageCategoriesClick={handleOnMangeCategories}
          onParentCategoryChange={handleParentCategoryChange}
        />
        <div style={{ height: 'fit-content', width: 'calc(100vw - 617px)' }}>
          <Grid
            data={gridData}
            columns={productColumns}
            id={`view-products-grid-${selectedParent}`}
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
            isMenuLoading={isFilterOptionsFetching || isCategoryFetching}
            page={page}
          />
        </div>
      </RowAlignWrapper>
    </MainContent>
  );
};

export default Products;
