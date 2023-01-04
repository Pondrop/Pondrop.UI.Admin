import { initialState } from '../constants';
import { IGridState } from "../types";

export interface ITemplateState extends IGridState {
  didCreateTemplate: boolean;
}

export const templateInitialState: ITemplateState = {
  ...initialState,
  sortValue: {
    field: 'fieldStatus',
    sort: 'asc'
  },
  didCreateTemplate: false
};
