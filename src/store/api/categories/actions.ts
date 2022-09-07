import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem, ISortItem } from "../types";
import { ICategoryState, ICreateCategoryRequest } from "./types";

const setCategoriesFilter = (state: ICategoryState, action: PayloadAction<IFilterItem>) => {
  return {
    ...state,
    filterItem: {
      columnField: action.payload.columnField,
      value: action.payload.value,
      operatorValue: action.payload.operatorValue
    }
  };
};

const setCategoriesSearchValue = (state: ICategoryState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setCategoriesSortValue = (state: ICategoryState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

const setCategoryFields = (state: ICategoryState, action: PayloadAction<ICreateCategoryRequest>) => {
  return {
    ...state,
    categoryField: action.payload
  };
};

export const actions = { setCategoriesFilter, setCategoriesSearchValue, setCategoriesSortValue, setCategoryFields };
