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

export interface IModalState {
  campaignTitle: string;
  campaignType: string;
  template: string;
  id: string;
}

export const CATEGORY_FOCUS_ID = '68a1ddc7-4d18-4cad-9fa9-23fde3dea96c';
