import { IValue } from "store/api/types";

export interface IUpdateProductProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newCategories: string[]) => void;
  isLoading?: boolean;
  isFetchingData?: boolean;
  categories: string[];
  categoryChips: IValue[];
}
