export interface IStoreDetails {
  storeId: number;
  storeName: string;
  storeType: string;
  address: string;
  status: string;
}

export interface IStoreState {
  value: IStoreDetails[];
  status: 'idle' | 'loading' | 'failed';
}
