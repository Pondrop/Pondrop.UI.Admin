import { IValue } from "store/api/types"

export interface IAutocompleteProps {
  onOptionSelect?: (option: IValue) => void;
}
