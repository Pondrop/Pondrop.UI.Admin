// Data passed when submitting
export interface INewFieldDialogData {
  label: string;
  templateType: string;
  fieldType: string;
  itemType: string;
  maxValue: number | null;
  pickerValues: string[];
}

// Props passed to New Template modal
export interface INewFieldProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (newTemplateData: INewFieldDialogData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
