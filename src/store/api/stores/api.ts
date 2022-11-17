import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse, IFilterItem, ISortItem } from '../types';

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
    getStores: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem, prevPageItems: number, pageSize: number, selectedProviders?: string[] }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10, selectedProviders = [] } = arg;
        
        let filterQuery = '';
        let sortQuery = '';

        if (selectedProviders?.length > 0) {
          selectedProviders.forEach((retailer, index) => {
            filterQuery = filterQuery.concat(`retailer/name eq '${retailer}'`);
            if (index !== selectedProviders?.length - 1) filterQuery = filterQuery.concat(' or ');
          });
        }

        if (Array.isArray(filterItem.value) && filterItem.value.length > 0 && filterItem.columnField !== 'retailer') {
          filterItem.value.forEach((filter, index) => {
            if (index !== 0) filterQuery = filterQuery.concat(' or ');
            filterQuery = filterQuery.concat(`${filterItem.columnField} eq '${filter}'`);
          });
        } else if (!Array.isArray(filterItem.value) && filterItem.value) filterQuery = filterQuery.concat(`${filterItem.columnField} eq ${filterItem.value}`);

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
          url: `/indexes/cosmosdb-index-store/docs?api-version=2021-04-30-Preview${`&$filter=Id eq '${storeId}'`}`,
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

export const { useGetAllStoreFilterQuery, useGetStoreInfoQuery, useGetStoresQuery } = storeApi;
