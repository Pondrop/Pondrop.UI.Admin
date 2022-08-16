import { IStoreDetails } from 'store/api/stores/types';

export const getAllUniqueValues = (field: string, data?: IStoreDetails[]) => {
  if (data?.length === 0) return [];
  const completeValues: string[] = [];
  data?.forEach((value) => completeValues.push(String(value[field])));

  return [...new Set(completeValues)];
};
