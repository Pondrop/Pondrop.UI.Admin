export interface IFilterItem {
  columnField: string;
  value: string | string[];
  operatorValue: string;
}

export interface IStoreState {
  filterItem: IFilterItem;
  searchValue?: string;
}
