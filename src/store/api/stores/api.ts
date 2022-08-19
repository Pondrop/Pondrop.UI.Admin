import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse } from '../types';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
  }),
  endpoints: (builder) => ({
    getStores: builder.query<IApiResponse, string | undefined>({
      query: (searchString?: string) => {
        return {
          url: `/indexes/azuresql-index-stores/docs?api-version=2021-04-30-Preview&search=${searchString}*`,
          method: 'GET',
          headers: {
            "api-key": "t9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe",
            "Content-Type": "application/json",
          }
        };
      },
    }),
  }),
});

export const { useGetStoresQuery } = storeApi;
