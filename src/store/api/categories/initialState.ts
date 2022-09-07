import { initialState } from '../constants';
import { ICategoryState } from "./types";

export const categoryInitialState: ICategoryState = {
  ...initialState,
  categoryField: {
    categoryName: '',
    description: ''
  }
};
