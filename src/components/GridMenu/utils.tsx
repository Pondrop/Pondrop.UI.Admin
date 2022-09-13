import { IFacetDetails } from 'store/api/types';

export const getAllUniqueValues = (data: IFacetDetails[]) => {
  const completeValues: string[] = [];

  data?.forEach((val) => {
    if (val.value) completeValues.push(val.value);
  });

  return [...new Set(completeValues)];
};

export const handleFilterStateChange = (value: string, filterItem: string | string[]) => {
  if (!Array.isArray(filterItem)) return [];
  const newFilterItems = filterItem.includes(value)
    ? filterItem.filter((val) => val !== value)
    : [...filterItem, value];

  return newFilterItems;
};
