import { IValue } from "store/api/types"

export interface IAutocompleteProps {
  onOptionSelect?: (option: IValue) => void;
  isModalOpen?: boolean;
  disabledOptions?: string[];
}
