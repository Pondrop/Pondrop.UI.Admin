import { ICreateCategoryRequest } from "store/api/categories/types";

export interface ICreateCategoryProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (createData: ICreateCategoryRequest) => void;
}
