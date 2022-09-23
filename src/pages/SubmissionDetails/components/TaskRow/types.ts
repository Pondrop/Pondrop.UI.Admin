import { IValue } from "store/api/types";

interface TaskRowValue {
  field: string;
  label: string;
  value: string;
}

export interface ITaskRowProps {
  url: string;
  rowData: TaskRowValue[];
}
