import { ICategoryDialogData } from "store/api/categories/types";

export interface ICreateCategoryProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (createData: ICategoryDialogData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
