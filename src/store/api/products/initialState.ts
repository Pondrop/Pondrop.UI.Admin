import { IGridState } from "../types";

export const initialState: IGridState = {
  filterItem: {
    columnField: '',
    value: [],
    operatorValue: ''
  },
  searchValue: '',
  sortValue: {
    field: 'PossibleCategories',
    sort: 'asc'
  }
};