import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStoreDetails } from './types';

export const storeApi = createApi({
  reducerPath: 'stores',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
    prepareHeaders: (headers) => {
      headers.set('api-key', 't9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStores: builder.query<IStoreDetails, void>({
      query: () => {

        return {
          url: '/indexes/azuresql-index-vwstores/docs?api-version=2021-04-30-Preview&search=*',
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetStoresQuery } = storeApi;
