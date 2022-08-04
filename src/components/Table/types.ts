export interface ITableData {
  [key: string]: any;
}

export interface ITableProps {
  tableData: ITableData[];
  typeOfData?: any[];
  width?: string;
  columnWidth?: string[];
  headers?: string[];
  labels?: boolean;
  alignment?: string;
  sort?: boolean;
  background?: string;
}

export type ITableContainer = Pick<ITableProps, 'width' | 'alignment'>;

export interface ITableHeaderCell {
  width?: string;
  alignment?: string;
  sortType?: string;
}

export interface ITableCell {
  width?: string;
  labelIndicator?: boolean;
  icon?: boolean;
}
