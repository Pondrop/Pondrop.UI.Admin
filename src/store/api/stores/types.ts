export interface IStoreDetails {
  [key: string]: number | string | string[];
}

export interface IStores {
  value: IStoreDetails[];
  "@odata.context": string;
  "@odata.nextLink": string;
}

export interface IFilterItem {
  columnField: string;
  value: string[];
}

export interface IFilterState {
  filterItem: IFilterItem;
}
