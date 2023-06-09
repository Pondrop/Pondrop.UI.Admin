import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { actions } from './actions';
import { productInitialState } from './initialState';

export const productsSlice = createSlice({
  name: 'products',
  initialState: productInitialState,
  reducers: actions,
});

export const selectProducts = (state: RootState) => state.products;

export const { resetProductToInitialState, setProductsFilter, setProductsSearchValue, setProductsSelectedCategories, setProductsSelectedIds, setProductsSelectedParent, setProductsSortValue } = productsSlice.actions;

export default productsSlice.reducer;
