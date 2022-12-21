import { ICreateCampaignRequest } from "store/api/tasks/types";

export type ICreateCampaignModalData = Omit<ICreateCampaignRequest, 'campaignStatus' | 'publicationlifecycleId'>;

// Props passed to New Camapaign modal
export interface INewCampaignProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (campaignModalData: ICreateCampaignModalData) => void;
  isCreateCampaignLoading: boolean;
}

// Data passed when submitting
export interface IModalData {
  name: string;
  campaignType: string;
  template: string;
}
