import { ICategoryDialogData } from "store/api/categories/types";

export interface IAddProductProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit?: (createData: ICategoryDialogData) => void;
  errorMessage?: string;
  isLoading?: boolean;
}
