// export interface IStoreDetails {
//   id: number;
//   storeName: string;
//   storeType: string;
//   address: string;
//   status: string;
//   provider: string;
// }

// export interface IStoreState {
//   value: IStoreDetails[];
//   status: 'idle' | 'loading' | 'failed';
// }

export interface IStoreDetails {
  [key: string]: number | string | string[];
}

export interface IStores {
  value: IStoreDetails[];
  "@odata.context": string;
  "@odata.nextLink": string;
}
