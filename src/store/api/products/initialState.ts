import { initialState } from '../constants';
import { IProductState } from "../types";

export const productInitialState: IProductState = {
  ...initialState,
  sortValue: {
    field: 'name',
    sort: 'asc'
  },
  selectedCategories: [],
  selectedParent: 'all'
};
