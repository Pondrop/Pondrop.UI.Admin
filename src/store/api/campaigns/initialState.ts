import { initialState } from '../constants';
import { IGridState } from "../types";

export interface ICampaignState extends IGridState {
  didCreateCampaign?: boolean;
}

export const campaignInitialState: ICampaignState = {
  ...initialState,
  sortValue: {
    field: 'campaignPublishedDate',
    sort: 'desc'
  },
  didCreateCampaign: false
};

export const newCampaignInitialState = {
  id: '',
  name: '',
  campaignType: '',
  campaignTriggerIds: [],
  campaignFocusCategoryIds: [],
  campaignFocusProductIds: [],
  selectedTemplateIds: [],
  storeIds: [],
  requiredSubmissions: 0,
  rewardSchemeId: null,
  campaignPublishedDate: null,
  campaignEndDate: null,
  campaignStatus: 'draft',
  publicationlifecycleId: '1'
};
