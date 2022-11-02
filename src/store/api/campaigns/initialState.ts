import { initialState } from '../constants';
import { IGridState } from "../types";

export const campaignInitialState: IGridState = {
  ...initialState,
  sortValue: {
    field: 'campaignPublishedDate',
    sort: 'desc'
  }
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
