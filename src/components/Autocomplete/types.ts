import { IValue } from "store/api/types"

// Props passed to Autocomplete component
export interface IAutocompleteProps {
  onOptionSelect?: (option: IValue) => void;
  isModalOpen?: boolean;
  disabledOptions?: string[];
}
