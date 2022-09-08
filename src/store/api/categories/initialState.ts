import { initialState } from '../constants';
import { ICategoryState } from "./types";

export const categoryInitialState: ICategoryState = {
  ...initialState,
  sortValue: {
    field: 'Category',
    sort: 'asc'
  },
  categoryField: {
    categoryName: '',
    description: ''
  }
};
