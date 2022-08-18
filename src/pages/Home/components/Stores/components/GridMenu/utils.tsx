import { GridRowsProp } from '@mui/x-data-grid';

export const getAllUniqueValues = (field: string, data?: GridRowsProp[]) => {
  if (data?.length === 0) return [];
  const completeValues: string[] = [];
  data?.forEach((value) => completeValues.push(String(value[field as keyof GridRowsProp])));

  return [...new Set(completeValues)];
};
