export interface INewTemplateDialogData {
  title: string;
  type: string;
  description: string;
  focusObject: string;
}

export interface ICreateCategoryProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newTemplateData: INewTemplateDialogData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
