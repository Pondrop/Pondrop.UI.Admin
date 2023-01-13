// Data passed when submitting
export interface INewFieldDialogData {
  title: string;
  type: string;
  initiatedBy: string;
  description: string;
  focus: string;
}

// Props passed to New Template modal
export interface INewFieldProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newTemplateData: INewFieldDialogData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
