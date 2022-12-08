import { IItemValue, ISteps } from "store/api/tasks/types";
import { IValue } from "store/api/types";

export interface ITaskRowProps {
  stepData?: ISteps;
  categoryFocus: IItemValue | null;
}

export enum IValueTypeFields {
  integer = "intValue",
  currency = "doubleValue",
  picker = "stringValue",
  text = "stringValue",
  multilineText = "stringValue",
  barcode = "stringValue",
  search = "itemValue",
  focus = "itemValue",
  date = "dateTimeValue"
}

export enum IFieldLabels {
  "4da32bd0-8fd7-49e7-9d78-185744cf650c" = "Product",
  "2ec0bcdf-340e-4876-89f3-799e6f00e7bb" = "Product",
  "0a532cbf-494c-4ded-aab0-e5e23df12b56" = "Quantity",
  "7018c555-422c-49e5-a801-b5d816e966c5" = "Ticket price",
  "c8cb7383-7b2f-4805-8fab-fe9f139eca5a" = "Product price",
  "a78e1178-7c8f-4b6f-80de-b9d6bf587387" = "Unit price",
  "210729c9-6193-464d-9be5-8044d9fecbcc" = "Unit price Unit of Measure",
  "707a31f0-4ed4-4fe1-8774-2fc68a42baf7" = "Aisle",
  "adb5cadb-738f-4c21-b538-b0d17574b0e5" = "Shelf number",
  "4ed6b03b-e78c-47eb-a5a6-025f4148bc46" = "Comments",
  "bc6eafe0-4272-47c9-95a8-2cb0a6d8a535" = "Category",
  "3995d781-e3c4-4407-a1ac-fe613b5c487d" = "Products",
  "88156d84-3bb4-4ca0-88c9-55895195f341" = "Price type",
  "1e73599f-b6a4-4cad-8726-7efc8b8b6eff" = "Label product name",
  "350d971c-6287-49c2-b2d9-48415de5db33" = "Label barcode",
  "92de4a21-a8b9-4edb-b00e-37099729d9cc" = "In-store shelf section",
  "bda8238a-445b-47c2-b8c5-72f5dcf30389" = "Nearest use by date",
  "9c534991-85bf-4bcb-9d9d-15ceb2d32f2a" = "Qty @ nearest use by date",
  "2436688a-9b51-49b8-ad2e-013c23bb1bbe" = "Furthest use by date",
  "827f99de-e0df-4cca-8912-35e097b07c84" = "Qty @ furthest use by date",
  "91e11392-a444-496d-a161-0d191d8d60dd" = "Product issues"
}

export interface IAddProductInitialValues {
  name: string;
  barcodeNumber: string;
  categoryIds: string[];
  categoryChips: IValue[];
}

export interface IManualChecker {
  name: string;
  id: string;
  isAdded: boolean;
  isInitialised: boolean;
}
