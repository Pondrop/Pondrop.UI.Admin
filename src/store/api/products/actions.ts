import { PayloadAction } from "@reduxjs/toolkit";

import { IFilterItem, IGridState } from "../types";

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

export const actions = { setProductsFilter, setProductsSearchValue };
