import { IProductDialogData } from "store/api/products/types";
import { IValue } from "store/api/types";

// Add Product initial values type
export interface IInitialValues {
  name: string;
  barcodeNumber: string;
  categoryIds: string[];
  categoryChips: IValue[];
}

// Props passed to Add Product Dialog
export interface IAddProductProps {
  id: string;
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (productData: IProductDialogData) => void;
  errorMessage?: string;
  isLoading?: boolean;
  initialValue?: IInitialValues;
}
