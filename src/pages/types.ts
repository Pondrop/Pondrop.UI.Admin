import { ReactNode } from "react";

import { ISubmissionDetailsResponse } from "store/api/tasks/types";
import { IValue } from "store/api/types";

export interface CommonTabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface ITabPanelProps extends CommonTabPanelProps {
  data?: IValue;
}

export interface ISubmissionInfoPanelProps extends CommonTabPanelProps {
  data?: ISubmissionDetailsResponse;
}

export interface IState {
  rowData?: IValue;
}
