import { ICategoryDialogData } from "store/api/categories/types";

export interface IAddLinkedProductsProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit?: (createData: ICategoryDialogData) => void;
  isLoading?: boolean;
  baseCategory: string;
}
