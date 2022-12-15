export interface INewTemplateDialogData {
  title: string;
  type: string;
  description: string;
  focus: string;
}

export interface ICreateCategoryProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newTemplateData: INewTemplateDialogData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
