import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { actions } from "./actions";
import { campaignInitialState } from "./initialState";

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: campaignInitialState,
  reducers: actions,
});

export const selectCampaigns = (state: RootState) => state.campaigns;

export const { setCampaignsFilter, setCampaignsSearchValue, setCampaignsSortValue, setDidCreateCampaign } = campaignsSlice.actions;

export default campaignsSlice.reducer;
