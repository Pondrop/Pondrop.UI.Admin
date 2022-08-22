import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse } from '../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IApiResponse, { searchString: string, prevPageItems: number, pageSize: number }>({
      query: (arg) => {
        const { searchString, prevPageItems = 0, pageSize = 10 } = arg;
        return {
          url: `/indexes/azuresql-index-products/docs?api-version=2021-04-30-Preview&search=${searchString}*&$count=true&$skip=${prevPageItems}&$top=${pageSize}`,
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

export const { useGetProductsQuery } = productsApi;
