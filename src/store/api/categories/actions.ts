import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem, IGridState, ISortItem } from "../types";

const setCategoriesFilter = (state: IGridState, action: PayloadAction<IFilterItem[]>) => {
  return {
    ...state,
    filterItem: [...action.payload]
  };
};

const setCategoriesSearchValue = (state: IGridState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setCategoriesSortValue = (state: IGridState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

const setCategoriesSelectedIds = (state: IGridState, action: PayloadAction<string[]>) => {
  return {
    ...state,
    selectedIds: action.payload
  };
};

export const actions = { setCategoriesFilter, setCategoriesSearchValue, setCategoriesSelectedIds, setCategoriesSortValue };
