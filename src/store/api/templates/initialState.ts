import { initialState } from '../constants';
import { IGridState } from "../types";

export interface ITemplateState extends IGridState {
  didCreateTemplate: boolean;
}

export const templateInitialState: ITemplateState = {
  ...initialState,
  sortValue: {
    field: 'status',
    sort: 'asc'
  },
  didCreateTemplate: false
};
