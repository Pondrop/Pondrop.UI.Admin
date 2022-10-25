export interface IItemValue {
  itemId: string;
  itemName: string;
  itemType: string;
}

export interface IValueTypes {
  doubleValue: number | null;
  id: string;
  intValue: number | null;
  photoUrl: string | null;
  stringValue: string | null;
  itemValue: IItemValue | null;
}

export interface IFields {
  id: string;
  label: string;
  templateFieldId: string;
  type: string;
  values: IValueTypes[];
}

export interface ISteps {
  fields: IFields[];
  id: string;
  templateStepId: string;
  title: string;
}

export interface ISubmissionDetailsResponse {
  createdBy: string;
  createdUtc: string;
  id: string;
  latitude: number;
  longitude: number;
  retailerName: string;
  steps: ISteps[];
  storeId: string;
  storeName: string;
  storeVisitId: string;
  submissionTemplateId: string;
  submittedUtc: string;
  templateTitle: string;
  updatedBy: string;
  updatedUtc: string;
}

export interface ISubmissionTemplateResponse {
  id: string;
  title: string;
  description: string;
  iconCodePoint: number;
  iconFontFamily: string;
  createdBy: string;
  updatedBy: string;
  createdUtc: string;
  updatedUtc: string;
  steps: unknown[];
}
