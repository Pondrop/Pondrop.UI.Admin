import { ReactNode } from "react";

import { IValue } from "store/api/types";

export interface ITabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  data?: IValue;
  isCreate?: boolean;
}

export interface IState {
  rowData?: IValue;
}
