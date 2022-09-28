import { ISteps } from "store/api/tasks/types";

export interface ITaskRowProps {
  stepData?: ISteps;
}

export enum IValueTypeFields {
  integer = "intValue",
  currency = "doubleValue",
  picker = "stringValue",
  multilineText = "stringValue",
  search = "itemValue",
} 
