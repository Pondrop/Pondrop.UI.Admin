import { ICategoryDialogData } from "store/api/categories/types";

export interface INewCampaignProps {
  isOpen: boolean;
  handleClose: () => void;
  //handleSubmit: (createData: ICategoryDialogData) => void;
}
