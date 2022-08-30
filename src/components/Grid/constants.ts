import { getGridStringOperators, GridColDef } from "@mui/x-data-grid";

export const storeColumns: GridColDef[] = [
  { field: 'Provider', headerName: 'Provider', filterOperators: getGridStringOperators(),width: 120 },
  { field: 'Name', headerName: 'Store Name', filterOperators: getGridStringOperators(), flex: 1 },
  { field: 'Street', headerName: 'Street', filterOperators: getGridStringOperators(), flex: 2 },
  { field: 'City', headerName: 'City', filterOperators: getGridStringOperators(), width: 150 },
  { field: 'State', headerName: 'State', filterOperators: getGridStringOperators(), width: 100 },
  { field: 'Zip_Code', headerName: 'Post Code', filterOperators: getGridStringOperators(), width: 150 },
];

export const productColumns: GridColDef[] = [
  { field: 'GTIN', headerName: 'GTIN', filterOperators: getGridStringOperators(), width: 150 },
  { field: 'Company_Name', headerName: 'Company Name', filterOperators: getGridStringOperators(), width: 320 },
  { field: 'Product', headerName: 'Product', filterOperators: getGridStringOperators(), flex: 1 },
  { field: 'PossibleCategories', headerName: 'Categories', filterOperators: getGridStringOperators(), flex: 1.5 },
];
