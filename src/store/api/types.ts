export interface IValue {
  [key: string]: number | string | string[];
}

export interface IApiResponse {
  value: IValue[];
  "@odata.context": string;
  "@odata.nextLink": string;
}
