import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import { IApiResponse, IFilterItem, ISortItem } from '../types';
import { IFullStoreInfo, IUpdateAddress, IUpdateStore, IUpdateStoreResponse } from './types';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
    prepareHeaders: (headers) => {
      headers.set('api-key', 't9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStores: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem[], prevPageItems: number, pageSize: number, selectedProviders?: string[] }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10, selectedProviders = [] } = arg;
        
        let filterQuery = '';
        let sortQuery = '';

        if (selectedProviders?.length > 0) {
          filterQuery = filterQuery.concat('(');
          selectedProviders.forEach((retailer, index) => {
            filterQuery = filterQuery.concat(`retailer/name eq '${retailer}'`);
            if (index !== selectedProviders?.length - 1) filterQuery = filterQuery.concat(' or ');
          });
          filterQuery = filterQuery.concat(')');
        }

        // FUTURE ENHANCEMENT: Take into account operatorValues other than isAnyOf
        // Currently limited to isAnyOf
        if (Array.isArray(filterItem) && filterItem.length > 0) {
          filterItem.forEach((filter, filterIndex) => {
            const filterValues = filter.value;
            if (Array.isArray(filterValues) && filter.columnField !== 'retailer') filterValues?.forEach((filterValue, index) => {
              if (filterIndex > 0 && filterQuery[filterQuery.length - 1] === ')') filterQuery = filterQuery.concat(' and ');
              if (index === 0) filterQuery = filterQuery.concat('(');
              if (index !== 0) filterQuery = filterQuery.concat(' or ');
              filterQuery = filterQuery.concat(`${filter.columnField} eq '${filterValue}'`);
              if (index === filterValues.length - 1) filterQuery = filterQuery.concat(')');
            });
          });
        }

        if (sortValue.sort) sortQuery = sortQuery.concat(`${sortValue.field} ${sortValue.sort}`);

        return {
          url: `/indexes/cosmosdb-index-store/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getStoreInfo: builder.query<IApiResponse, { storeId: string }>({
      query: (arg) => {
        const { storeId } = arg;
        return {
          url: `/indexes/cosmosdb-index-store/docs?api-version=2021-04-30-Preview${`&$filter=id eq '${storeId}'`}`,
          method: 'GET',
        };
      },
    }),
    getAllStoreFilter: builder.query<IApiResponse, { searchString: string }>({
      query: (arg) => {
        const { searchString } = arg;
        return {
          url: `/indexes/cosmosdb-index-store/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*&$count=true&facet=retailer/name,count:0,sort:value&facet=name,count:0,sort:value&facet=addressLine1,count:0,sort:value&facet=suburb,count:0,sort:value&facet=state,count:0,sort:value&facet=postcode,count:0,sort:value`,
          method: 'GET',
        };
      },
    })
  }),
});

export const storesMicroService = createApi({
  reducerPath: 'storesMicroService',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://store-service.ashyocean-bde16918.australiaeast.azurecontainerapps.io",
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MDlkMzcwOS1jMmY5LTRkMDYtOGVhNy04NTc5OTBjYTdlN2IiLCJlbWFpbCI6ImFkbWluQHhhbS5jb20uYXUiLCJ0eXAiOiJBZG1pbiIsIm5iZiI6MTY2MzA0NjEzMywiZXhwIjoxNjk0NTgyMTMzLCJpYXQiOjE2NjMwNDYxMzN9.zMyjBMXOR6wVAol0UcZC9jdN6p9M2eSJekBJzamXwbs');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFullStoreInfo: builder.query<IFullStoreInfo, { storeId: string }>({
      query: (arg) => {
        const { storeId } = arg;
        return {
          url: `/Store/${storeId}`,
          method: 'GET'
        };
      },
    }),
    updateStore: builder.mutation<IUpdateStoreResponse, IUpdateStore>({
      query: (arg) => {
        return {
          url: `/Store/update`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    updateAddress: builder.mutation<IUpdateStoreResponse, IUpdateAddress>({
      query: (arg) => {
        return {
          url: `/Store/address/update`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    refreshStores: builder.query<void, void>({
      query: () => {
        return {
          url: `/Store/indexer/run`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAllStoreFilterQuery, useGetStoreInfoQuery, useGetStoresQuery } = storeApi;
export const { useGetFullStoreInfoQuery, useLazyRefreshStoresQuery, useUpdateAddressMutation, useUpdateStoreMutation } = storesMicroService;
