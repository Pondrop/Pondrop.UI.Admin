import { GridRowsProp } from '@mui/x-data-grid';

import { IFilterItem } from 'store/api/types';

export const getAllUniqueValues = (field: string, data?: GridRowsProp[]) => {
  if (data?.length === 0) return [];
  const completeValues: string[] = [];
  data?.forEach((value) => completeValues.push(String(value[field as keyof GridRowsProp])));

  return [...new Set(completeValues)];
};

export const handleFilterStateChange = (value: string, filterItem: IFilterItem) => {
  if (!Array.isArray(filterItem.value)) return [];
  const newFilterItems = filterItem.value.includes(value)
    ? filterItem.value.filter((val) => val !== value)
    : [...filterItem.value, value];

  return newFilterItems;
};
