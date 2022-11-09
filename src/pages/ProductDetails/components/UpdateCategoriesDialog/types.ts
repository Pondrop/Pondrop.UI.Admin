import { IValue } from "store/api/types";

export interface IUpdateProductProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newCategories: string[]) => void;
  errorMessage?: string;
  isLoading?: boolean;
  categories: string[];
  categoryChips: IValue[];
}
