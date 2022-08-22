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
    getStores: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem, prevPageItems: number, pageSize: number }>({
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
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&search=${searchString}*${filterQuery && `&$filter=${filterQuery}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getAllProviders: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&$count=true&facet=Provider,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllNames: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&$count=true&facet=Name,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllStreets: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&$count=true&facet=Street,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllCities: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&$count=true&facet=City,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllStates: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&$count=true&facet=State,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllPostCodes: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&$count=true&facet=Zip_Code,count:0`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetStoresQuery, useGetAllProvidersQuery, useGetAllNamesQuery, useGetAllStreetsQuery, useGetAllCitiesQuery, useGetAllStatesQuery, useGetAllPostCodesQuery } = storeApi;
