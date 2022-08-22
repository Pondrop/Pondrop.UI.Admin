import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem, IGridState, ISortItem } from "../types";

const setProductsFilter = (state: IGridState, action: PayloadAction<IFilterItem>) => {
  return {
    ...state,
    filterItem: {
      columnField: action.payload.columnField,
      value: action.payload.value,
      operatorValue: action.payload.operatorValue
    }
  };
};

const setProductsSearchValue = (state: IGridState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setProductsSortValue = (state: IGridState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

export const actions = { setProductsFilter, setProductsSearchValue, setProductsSortValue };
