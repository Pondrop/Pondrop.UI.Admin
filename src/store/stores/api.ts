import { storeDetails } from 'assets/data/tableData';
import { IStoreDetails } from './types';

export function fetchStores(quantity = 800) {
  return new Promise<{ data: IStoreDetails[] }>((resolve) =>
    setTimeout(() => resolve({ data: storeDetails }), quantity),
  );
}
