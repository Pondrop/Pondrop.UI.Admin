import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse, IFilterItem, ISortItem } from '../types';

export const campaignsApi = createApi({
  reducerPath: 'campaignsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
    prepareHeaders: (headers) => {
      headers.set('api-key', 't9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCampaigns: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem, prevPageItems: number, pageSize: number }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10 } = arg;

        let filterQuery = '';
        let sortQuery = '';

        if (Array.isArray(filterItem.value) && filterItem.value.length > 0) {
          filterItem.value.forEach((filter, index) => {
            if (index !== 0) filterQuery = filterQuery.concat(' or ');
            filterQuery = filterQuery.concat(`${filterItem.columnField} eq '${filter}'`);
          });
        } else if (!Array.isArray(filterItem.value) && filterItem.value) filterQuery = filterQuery.concat(`${filterItem.columnField} eq ${filterItem.value}`);

        if (sortValue.sort) sortQuery = sortQuery.concat(`${sortValue.field} ${sortValue.sort}`);

        return {
          url: `/indexes/cosmosdb-index-campaign/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getAllCampaignFilter: builder.query<IApiResponse, { searchString: string }>({
      query: (arg) => {
        const { searchString } = arg;
        return {
          url: `/indexes/cosmosdb-index-campaign/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*&$count=true&facet=name,count:0,sort:value&facet=selectedTemplateTitle,count:0,sort:value&facet=campaignType,count:0,sort:value&facet=numberOfStores,count:0,sort:value&facet=completions,count:0,sort:value&facet=campaignPublishedDate,count:0,sort:value&facet=campaignStatus,count:0,sort:value`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAllCampaignFilterQuery, useGetCampaignsQuery } = campaignsApi;
