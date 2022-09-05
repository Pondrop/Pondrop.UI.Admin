import { MutableRefObject, ReactNode } from "react";

import { ICreateCategoryRequest } from "store/api/categories/types";
import { IValue } from "store/api/types";

export interface ITabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  data?: IValue;
  isCreate?: boolean;
}

export interface ICategoryTabProps extends ITabPanelProps {
  isCreate: boolean;
  requestRef: MutableRefObject<ICreateCategoryRequest>;
}

export interface IState {
  rowData?: IValue;
}
