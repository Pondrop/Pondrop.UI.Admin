import { initialState } from '../constants';
import { IGridState } from '../types';

export const categoryInitialState: IGridState = {
  ...initialState,
  sortValue: {
    field: 'categoryName',
    sort: 'asc'
  }
};
