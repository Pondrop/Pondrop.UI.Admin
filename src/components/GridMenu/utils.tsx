import { IFacetDetails, IFilterItem } from 'store/api/types';

export const getAllUniqueValues = (data: IFacetDetails[]) => {
  const completeValues: string[] = [];

  data.forEach((val) => completeValues.push(val.value));

  return [...new Set(completeValues)];
};

export const handleFilterStateChange = (value: string, filterItem: IFilterItem) => {
  if (!Array.isArray(filterItem.value)) return [];
  const newFilterItems = filterItem.value.includes(value)
    ? filterItem.value.filter((val) => val !== value)
    : [...filterItem.value, value];

  return newFilterItems;
};
