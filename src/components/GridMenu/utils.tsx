import { GridColDef } from '@mui/x-data-grid-pro';

import { IFacetDetails, IFilterItem } from 'store/api/types';

// Gets all unique valid values
export const getAllUniqueValues = (data: IFacetDetails[]) => {
  const completeValues: string[] = [];

  data?.forEach((val) => {
    if (typeof val.value === 'boolean') {
      const tempValue = val.value ? 'Yes' : 'No';
      completeValues.push(tempValue);
    } else if (val.value !== '') completeValues.push(val.value);
  });

  return [...new Set(completeValues)];
};

// Generates formatted initial filter state
export const generateFilterInitState = (columns: GridColDef[]) => {
  const initialStateContainer: IFilterItem[] = [];

  columns.forEach((col) =>
    initialStateContainer.push({
      id: col.field,
      columnField: col.field,
      value: [],
      operatorValue: 'isAnyOf',
    }),
  );

  return initialStateContainer;
};

// Removes or adds filter depending if it's already present
export const handleFilterStateChange = (value: string, filterItem: string | string[]) => {
  if (!Array.isArray(filterItem)) return [];
  const newFilterItems = filterItem.includes(value)
    ? filterItem.filter((val) => val !== value)
    : [...filterItem, value];

  return newFilterItems;
};
