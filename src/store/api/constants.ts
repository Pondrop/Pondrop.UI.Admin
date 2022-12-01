import { IGridState } from "./types";

export const initialState: IGridState = {
  filterItem: [],
  searchValue: '',
  sortValue: {
    field: '',
    sort: null
  },
  selectedIds: [],
};
