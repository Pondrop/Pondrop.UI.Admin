// Data passed when submitting
export interface INewTemplateDialogData {
  title: string;
  type: string;
  initiatedBy: string;
  description: string;
  focus: string;
}

// Props passed to New Template modal
export interface INewTemplateProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newTemplateData: INewTemplateDialogData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
