import { IValue } from "store/api/types";

// Props passed to Update Products Dialog
export interface IUpdateProductProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newCategories: string[]) => void;
  isLoading?: boolean;
  isFetchingData?: boolean;
  categories: string[];
  categoryChips: IValue[];
}
