import { IProductDialogData } from "store/api/products/types";

export interface IAddProductProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (productData: IProductDialogData) => void;
  errorMessage?: string;
  isLoading?: boolean;
}
