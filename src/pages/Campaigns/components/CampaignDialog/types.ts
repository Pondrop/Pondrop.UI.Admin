import { ICreateCampaignRequest } from "store/api/tasks/types";

export type ICreateCampaignModalData = Omit<ICreateCampaignRequest, 'campaignStatus' | 'publicationlifecycleId'>;

export interface INewCampaignProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (campaignModalData: ICreateCampaignModalData) => void;
  isCreateCampaignLoading: boolean;
}

export interface IModalData {
  name: string;
  campaignType: string;
  template: string;
}
