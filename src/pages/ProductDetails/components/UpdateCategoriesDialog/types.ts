//import { IProductDialogData } from "store/api/products/types";
import { IValue } from "store/api/types";

export interface IUpdateProductProps {
  isOpen: boolean;
  handleClose: () => void;
  //handleSubmit: (productData: IProductDialogData) => void;
  errorMessage?: string;
  isLoading?: boolean;
  categories: string[];
  categoryChips: IValue[];
}
