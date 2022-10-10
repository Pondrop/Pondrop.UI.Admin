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

// Other variables
import { useAppDispatch, useAppSelector } from 'store';
import { IFacetValue, IFilterItem, IProductValue } from 'store/api/types';
import { useGetAllProductFilterQuery } from 'store/api/products/api';
import { productInitialState } from 'store/api/products/initialState';
import {
  selectProducts,
  setProductsFilter,
  setProductsSearchValue,
  setProductsSortValue,
} from 'store/api/products/slice';
import { productsDummyData } from './components/CategoryList/constants';
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
  const [gridData, setGridData] = useState<IProductValue[]>(productsDummyData);
  const [productsFilterItem, setProductsFilterItem] = useState<IFilterItem>(productInitialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '' } = useAppSelector(selectProducts);

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllProductFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const menuData = {
    GTIN: filterOptionsData?.['@search.facets']?.GTIN,
    Product: filterOptionsData?.['@search.facets']?.Product,
    Categories: filterOptionsData?.['@search.facets']?.Categories,
  };

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'PossibleCategories', sort: 'asc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    setProductsFilterItem(filterItem);
  }, [filterItem]);

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
      setProductsFilter({
        columnField: currColumn,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  const handleOnRowClick = (params: GridRowParams) => {
    // Uncomment when feature will be worked on
    navigate(`${params.id}`, { replace: false, state: { rowData: params.row } });
  };

  const handleOnMangeCategories = () => {
    navigate('categories', { replace: false });
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
          <SearchField id="category-search-field" value={searchValue} onEnterPress={handleSearchDispatch} />
        </RowAlignWrapper>
      </SpaceBetweenDiv>
      <RowAlignWrapper>
        <CategoryList onManageCategoriesClick={handleOnMangeCategories} />
        <div style={{ height: 'fit-content', width: 'calc(100vw - 617px)' }}>
          <Grid
            data={gridData}
            columns={productColumns}
            id="view-products-grid"
            isFetching={false}
            onFilterModelChange={onFilterModelChange}
            filterItem={productsFilterItem}
            handleOnFilterClick={handleOnFilterClick}
            rowCount={10}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            menuData={menuData as IFacetValue}
            onSortModelChange={handleSortModelChange}
            initialState={initialGridState}
            onRowClick={handleOnRowClick}
            isMenuLoading={isFilterOptionsFetching}
          />
        </div>
      </RowAlignWrapper>
    </MainContent>
  );
};

export default Products;
