import { ChangeEvent, FunctionComponent, KeyboardEvent, useState, useEffect } from 'react';

import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { GridColDef, GridFilterModel } from '@mui/x-data-grid';

import { productColumns } from 'components/Grid/constants';
import { useAppDispatch, useAppSelector } from 'store';
import { IFilterItem } from 'store/api/types';
import { useGetProductsQuery } from 'store/api/products/api';
import { initialState } from 'store/api/products/initialState';
import { selectProducts, setProductsFilter, setProductsSearchValue } from 'store/api/products/slice';
import { ColAlignDiv, RowAlignDiv, ContentWrapper, StyledTextField, StyledTitle } from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';

const Products: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { filterItem, searchValue } = useAppSelector(selectProducts);
  const { data, isFetching } = useGetProductsQuery(searchValue);

  // States
  const [searchValueString, setSearchValueString] = useState<string>('');
  const [productsFilterItem, setProductsFilterItem] = useState<IFilterItem>(initialState.filterItem);

  // Use Effects
  useEffect(() => {
    setProductsFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setSearchValueString(searchValue ?? '');
  }, [searchValue]);

  // Handlers
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValueString(e.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setProductsSearchValue(searchValueString));
    }
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

  const handleOnFilterClick = (event: ChangeEvent<HTMLInputElement>, currentColumn: GridColDef) => {
    if (!event?.target?.labels) return;

    const combinedValue =
      productsFilterItem.columnField === currentColumn.field && Array.isArray(productsFilterItem.value)
        ? handleFilterStateChange(event?.target?.labels[0].outerText, productsFilterItem)
        : [event?.target?.labels[0].outerText];

    dispatch(
      setProductsFilter({
        columnField: currentColumn.field,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  return (
    <ContentWrapper>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle variant="h5" gutterBottom>
            Products
          </StyledTitle>
          <StyledTitle variant="caption">Last updated: 12th August, 2022 @ 10:01am</StyledTitle>
        </ColAlignDiv>
        <StyledTextField
          id="search-field"
          variant="standard"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchValueString}
          onChange={handleSearch}
          onKeyDown={handleOnKeyDown}
        />
      </RowAlignDiv>
      <Grid
        data={data?.value}
        columns={productColumns}
        id="view-products-grid"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={productsFilterItem}
        handleOnFilterClick={handleOnFilterClick}
      />
    </ContentWrapper>
  );
};

export default Products;
