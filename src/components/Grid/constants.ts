import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";
import { handleRenderCell } from "./utils";

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
  { field: 'GTIN', headerName: 'GTIN', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'Company_Name', headerName: 'Company Name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 320, renderCell: handleRenderCell },
  { field: 'Product', headerName: 'Product', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'PossibleCategories', headerName: 'Categories', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
];

export const categoriesColumns: GridColDef[] = [
  { field: 'Category', headerName: 'Category', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'Description', headerName: 'Category Description', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 2, renderCell: handleRenderCell },
];

export const linkedProductsColumns: GridColDef[] = [
  { field: 'Product', headerName: 'Product', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'GTIN', headerName: 'GTIN', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'PossibleCategories', headerName: 'Categories', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
  { field: 'Brand', headerName: 'Brand Name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
];
