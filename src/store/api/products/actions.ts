import { PayloadAction } from '@reduxjs/toolkit';
import { GridSortDirection } from '@mui/x-data-grid';

import { initialState } from '../constants';
import { IFilterItem, IProductState, ISortItem } from '../types';

const setProductsFilter = (state: IProductState, action: PayloadAction<IFilterItem>) => {
  return {
    ...state,
    filterItem: {
      columnField: action.payload.columnField,
      value: action.payload.value,
      operatorValue: action.payload.operatorValue
    }
  };
};

const setProductsSearchValue = (state: IProductState, action: PayloadAction<string>) => {
  return {
    ...state,
    searchValue: action.payload
  };
};

const setProductsSortValue = (state: IProductState, action: PayloadAction<ISortItem>) => {
  return {
    ...state,
    sortValue: {
      field: action.payload.field,
      sort: action.payload.sort,
    }
  };
};

const setProductsSelectedIds = (state: IProductState, action: PayloadAction<string[]>) => {
  return {
    ...state,
    selectedIds: action.payload
  };
};

const setProductsSelectedCategories = (state: IProductState, action: PayloadAction<string[]>) => {
  return {
    ...state,
    selectedCategories: action.payload
  };
};

const setProductsSelectedParent = (state: IProductState, action: PayloadAction<string>) => {
  return {
    ...state,
    selectedParent: action.payload
  };
};

const resetToInitialState = (state: IProductState, action: PayloadAction<undefined>) => {
  return {
    ...state,
    ...initialState,
    sortValue: {
      field: 'name',
      sort: 'asc' as GridSortDirection
    },
    selectedCategories: [],
  };
};

export const actions = { resetToInitialState, setProductsFilter, setProductsSearchValue, setProductsSelectedCategories, setProductsSelectedIds, setProductsSelectedParent, setProductsSortValue };
