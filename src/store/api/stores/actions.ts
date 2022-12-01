import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem, IGridState, ISortItem } from "../types";

const setStoresFilter = (state: IGridState, action: PayloadAction<IFilterItem[]>) => {
  return {
    ...state,
    filterItem: [...action.payload]
  };
};

const setStoresSearchValue = (state: IGridState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setStoresSortValue = (state: IGridState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

const setStoresSelectedIds = (state: IGridState, action: PayloadAction<string[]>) => {
  return {
    ...state,
    selectedIds: action.payload
  };
};

const setStoresSelectedProviders = (state: IGridState, action: PayloadAction<string[]>) => {
  return {
    ...state,
    selectedProviders: action.payload
  };
};

export const actions = { setStoresFilter, setStoresSearchValue, setStoresSelectedIds, setStoresSelectedProviders, setStoresSortValue };
