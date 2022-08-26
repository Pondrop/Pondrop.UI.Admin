import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse, IFilterItem, ISortItem } from '../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
    prepareHeaders: (headers) => {
      headers.set('api-key', 't9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem, prevPageItems: number, pageSize: number }>({
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
          url: `/indexes/azuresql-index-products/docs?api-version=2021-04-30-Preview&search=${searchString}*${filterQuery && `&$filter=${filterQuery}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getProductInfo: builder.query<IApiResponse, { productId: string }>({
      query: (arg) => {
        const { productId } = arg;
        return {
          url: `/indexes/azuresql-index-products/docs?api-version=2021-04-30-Preview${`&$filter=Id eq '${productId}'`}`,
          method: 'GET',
        };
      },
    }),
    getAllGTINs: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-products/docs?api-version=2021-04-30-Preview&$count=true&facet=GTIN,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllCompanyNames: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-products/docs?api-version=2021-04-30-Preview&$count=true&facet=Company_Name,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllProducts: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-products/docs?api-version=2021-04-30-Preview&$count=true&facet=Product,count:0`,
          method: 'GET',
        };
      },
    }),
    getAllCategories: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/azuresql-index-products/docs?api-version=2021-04-30-Preview&$count=true&facet=PossibleCategories,count:0`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProductInfoQuery, useGetProductsQuery, useGetAllGTINsQuery, useGetAllCompanyNamesQuery, useGetAllProductsQuery, useGetAllCategoriesQuery } = productsApi;
