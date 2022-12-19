import { initialState } from '../constants';
import { IGridState } from "../types";

export const taskInitialState: IGridState = {
  ...initialState,
  sortValue: {
    field: 'submittedUtc',
    sort: 'desc'
  }
};

export const addTemplateStepInitialState = {
  submissionId: '',
  title: '',
  instructions: '',
  instructionsStep: [],
  instructionsContinueButton: '',
  instructionsSkipButton: '',
  instructionsIconFontFamily: 'MaterialIcons',
  isSummary: true,
  fieldDefinitions: []
};
