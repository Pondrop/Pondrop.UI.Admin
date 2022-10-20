import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { categoryInitialState } from "./initialState";

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoryInitialState,
  reducers: actions,
});

export const selectCategories = (state: RootState) => state.categories;

export const { setCategoriesFilter, setCategoriesSearchValue, setCategoriesSelectedIds, setCategoriesSortValue } = categoriesSlice.actions;

export default categoriesSlice.reducer;
