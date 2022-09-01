import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { initialState } from "../constants";

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: actions,
});

export const selectCategories = (state: RootState) => state.categories;

export const { setCategoriesFilter, setCategoriesSearchValue, setCategoriesSortValue } = categoriesSlice.actions;

export default categoriesSlice.reducer;
