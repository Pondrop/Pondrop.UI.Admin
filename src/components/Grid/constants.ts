import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";
import { handleRenderCell, handleRenderCellDate } from "./utils";

// filterOperators to be updated to make way for ssr filters, disabled most operators for now

export const storeColumns: GridColDef[] = [
  { field: 'Provider', headerName: 'Provider', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'),width: 120, renderCell: handleRenderCell },
  { field: 'Name', headerName: 'Store Name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'Street', headerName: 'Street', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 2, renderCell: handleRenderCell },
  { field: 'City', headerName: 'City', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'State', headerName: 'State', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 100, renderCell: handleRenderCell },
  { field: 'Zip_Code', headerName: 'Post Code', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
];

export const productColumns: GridColDef[] = [
  { field: 'Name', headerName: 'Product Name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'GTIN', headerName: 'GTIN', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'Categories', headerName: 'Categories', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
];

export const categoriesColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'Description', headerName: 'Parent Category', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 2, renderCell: handleRenderCell },
];

export const linkedProductsColumns: GridColDef[] = [
  { field: 'Product', headerName: 'Product', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'GTIN', headerName: 'GTIN', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'PossibleCategories', headerName: 'Categories', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
  { field: 'Brand', headerName: 'Brand Name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
];

export const tasksColumns: GridColDef[] = [
  { field: 'taskType', headerName: 'Task Type', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'submittedUtc', headerName: 'Date & Time Submitted', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), width: 200, renderCell: handleRenderCellDate },
  { field: 'retailerName', headerName: 'Provider', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), width: 120, renderCell: handleRenderCell },
  { field: 'storeName', headerName: 'Store Name', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'Product', headerName: 'Product', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
];
