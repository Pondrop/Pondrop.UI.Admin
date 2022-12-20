import { ICategoryDialogData } from "store/api/categories/types";

// Props passed to Create Category modal
export interface ICreateCategoryProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (createData: ICategoryDialogData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
