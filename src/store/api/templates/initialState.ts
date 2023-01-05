import { initialState } from '../constants';
import { IGridState, IValue } from "../types";

export interface ITemplateState extends IGridState {
  didCreateTemplate: boolean;
  selectedFields: IValue[];
}

export const templateInitialState: ITemplateState = {
  ...initialState,
  sortValue: {
    field: 'status',
    sort: 'asc'
  },
  didCreateTemplate: false,
  selectedFields: []
};

export const selectedFieldsInitialState: ITemplateState = {
  ...initialState,
  sortValue: {
    field: 'fieldStatus',
    sort: 'asc'
  },
  didCreateTemplate: false,
  selectedFields: []
};
