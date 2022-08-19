import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { initialState } from "./initialState";

export const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: actions,
});

export const selectProducts = (state: RootState) => state.products;

export const { setProductsFilter, setProductsSearchValue } = productsSlice.actions;

export default productsSlice.reducer;
