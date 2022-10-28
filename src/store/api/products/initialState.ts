import { initialState } from '../constants';
import { IGridState } from "../types";

export const productInitialState: IGridState = {
  ...initialState,
  sortValue: {
    field: 'name',
    sort: 'asc'
  },
  selectedCategories: []
};
