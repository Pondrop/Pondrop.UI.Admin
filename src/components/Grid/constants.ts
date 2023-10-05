import { getGridStringOperators, GridColDef } from '@mui/x-data-grid-pro';
import { handleRenderCell, handleRenderCellDate, handleRenderCellFormat, handleRenderChips, handleRenderDeleteButton, handleRenderDropdown, handleRenderFieldType, handleRenderManualSubmissions, handleRenderProvider } from './utils';

// filterOperators to be updated to make way for ssr filters, disabled most operators for now

export const storeColumns: GridColDef[] = [
  { field: 'retailer', headerName: 'Provider', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'),width: 120, renderCell: handleRenderProvider, sortable: false },
  { field: 'name', headerName: 'Store name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'addressLine1', headerName: 'Street', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 2, renderCell: handleRenderCell },
  { field: 'suburb', headerName: 'City', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'state', headerName: 'State', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 100, renderCell: handleRenderCell },
  { field: 'postcode', headerName: 'Post code', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
];

export const campaignStoreColumns: GridColDef[] = [
  { field: 'retailer', headerName: 'Provider', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'),width: 200, renderCell: handleRenderProvider, sortable: false },
  { field: 'name', headerName: 'Store name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'suburb', headerName: 'Suburb', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 200, renderCell: handleRenderCell },
  { field: 'state', headerName: 'State', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 200, renderCell: handleRenderCell },
  { field: 'postcode', headerName: 'Post code', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 200, renderCell: handleRenderCell },
];

export const productColumns: GridColDef[] = [
  { field: 'name', headerName: 'Product name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
  { field: 'barcodeNumber', headerName: 'GTIN', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'categories', headerName: 'Categories', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: (params) => handleRenderChips(params, true), sortable: false },
];

export const categoriesColumns: GridColDef[] = [
  { field: 'categoryName', headerName: 'Name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'parentName', headerName: 'Parent Category', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 2, renderCell: handleRenderCell },
];

export const linkedProductsColumns: GridColDef[] = [
  { field: 'name', headerName: 'Product name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
  { field: 'barcodeNumber', headerName: 'GTIN', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'categories', headerName: 'Categories', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: (params) => handleRenderChips(params, false), sortable: false },
];

export const addLinkedProductsColumns: GridColDef[] = [
  { field: 'name', headerName: 'Product name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'barcodeNumber', headerName: 'GTIN', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
];

export const tasksColumns: GridColDef[] = [
  { field: 'taskType', headerName: 'Task type', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), width: 250, renderCell: handleRenderCell },
  { field: 'submittedUtc', headerName: 'Date & time submitted', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), width: 200, renderCell: handleRenderCellDate },
  { field: 'retailerName', headerName: 'Provider', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), width: 150, renderCell: handleRenderCell },
  { field: 'storeName', headerName: 'Store name', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'templateName', headerName: 'Template', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
];

export const campaignsColumns: GridColDef[] = [
  { field: 'name', headerName: 'Campaign name', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'selectedTemplateTitle', headerName: 'Template', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'campaignType', headerName: 'Campaign type', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 140, renderCell: handleRenderCellFormat },
  { field: 'numberOfStores', headerName: 'Number of stores', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 120, renderCell: handleRenderCell },
  { field: 'completions', headerName: 'Completions', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 140, renderCell: handleRenderCell },
  { field: 'campaignStartDate', headerName: 'Start date', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 200, renderCell: handleRenderCellDate },
  { field: 'campaignEndDate', headerName: 'End date', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 200, renderCell: handleRenderCellDate },
  { field: 'campaignStatus', headerName: 'Status', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 180, renderCell: handleRenderCellFormat },
];

export const templatesColumns: GridColDef[] = [
  { field: 'title', headerName: 'Title', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
  { field: 'type', headerName: 'Type', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCellFormat },
  { field: 'initiatedBy', headerName: 'Initiated by', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), flex: 1, renderCell: handleRenderCellFormat },
  // { field: 'isForManualSubmissions', headerName: 'Manual Submissions', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 180, renderCell: handleRenderManualSubmissions },
  { field: 'focus', headerName: 'Focus', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 140, renderCell: handleRenderCellFormat },
  { field: 'createdUtc', headerName: 'Date created', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 180, renderCell: handleRenderCellDate },
  { field: 'status', headerName: 'Status', filterOperators: getGridStringOperators().filter((op) => op.value === 'isAnyOf'), width: 140, renderCell: handleRenderCellFormat },
];

export const selectedFieldsColumns: GridColDef[] = [
  { field: 'label', headerName: 'Field label name', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
  { field: 'fieldType', headerName: 'Field type', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderFieldType },
  { field: 'maxValue', headerName: 'Max value', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
  { field: 'mandatory', headerName: 'Mandatory', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderDropdown },
  { field: 'delete', headerName: '', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), width: 50, renderCell: handleRenderDeleteButton, disableColumnMenu: true, sortable: false },
];

export const availableFieldsColumns: GridColDef[] = [
  { field: 'label', headerName: 'Field label name', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1.5, renderCell: handleRenderCell },
  { field: 'fieldType', headerName: 'Field type', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderFieldType },
  { field: 'maxValue', headerName: 'Max value', filterOperators: getGridStringOperators().filter((op) => String(op) === 'isAnyOf'), flex: 1, renderCell: handleRenderCell },
];
