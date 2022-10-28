import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse, IFilterItem, ISortItem, IValue } from '../types';

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
    getProducts: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem, prevPageItems: number, pageSize: number, parentCategory?: string, selectedCategories?: string[] }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10, parentCategory, selectedCategories = [] } = arg;

        let filterQuery = '';
        let sortQuery = '';
        let searchQuery = searchString ? `${encodeURIComponent(searchString)}*` : '';

        if (parentCategory) {
          filterQuery = filterQuery.concat(`parentCategoryId eq '${parentCategory}'`);
        }
        if (Array.isArray(filterItem.value) && filterItem.value.length > 0 && !parentCategory) {
          filterItem.value.forEach((filter, index) => {
            if (index === 0 && parentCategory) filterQuery = filterQuery.concat(' and ');
            if (index !== 0) filterQuery = filterQuery.concat(' or ');
            filterQuery = filterQuery.concat(`${filterItem.columnField} eq '${filter}'`);
          });
        } else if (!Array.isArray(filterItem.value) && filterItem.value) filterQuery = filterQuery.concat(`${filterItem.columnField} eq ${filterItem.value}`);

        if (sortValue.sort) sortQuery = sortQuery.concat(`${sortValue.field} ${sortValue.sort}`);

        if (selectedCategories?.length > 0) {
          if (searchString) searchQuery = searchQuery.concat(' ');
          searchQuery = searchQuery.concat('categoryNames:(');
          selectedCategories.forEach((categ, index) => {
            searchQuery = searchQuery.concat(`"${categ}"`);
            if (index !== selectedCategories?.length - 1) searchQuery = searchQuery.concat(' OR ');
          });
          searchQuery = searchQuery.concat(')');
        }

        return {
          url: `/indexes/cosmosdb-index-parentprodcat/docs?api-version=2021-04-30-Preview${searchQuery && `&search=${searchQuery}`}${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}&searchMode=all&queryType=full`,
          method: 'GET',
        };
      },
    }),
    getProductInfo: builder.query<IApiResponse, { productId: string }>({
      query: (arg) => {
        const { productId } = arg;
        return {
          url: `/indexes/cosmosdb-index-product/docs?api-version=2021-04-30-Preview${`&$filter=Id eq '${productId}'`}`,
          method: 'GET',
        };
      },
    }),
    getAllProductFilter: builder.query<IApiResponse, { searchString: string, parentCategory?: string }>({
      query: (arg) => {
        const { searchString, parentCategory } = arg;

        let filterQuery = '';

        if (parentCategory) {
          filterQuery = filterQuery.concat(`parentCategoryId eq '${parentCategory}'`);
        }

        return {
          url: `/indexes/cosmosdb-index-parentprodcat/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&facet=name,count:0,sort:value&facet=barcodeNumber,count:0,sort:value`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const productsMicroService = createApi({
  reducerPath: 'productsMicroService',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://product-service.ashyocean-bde16918.australiaeast.azurecontainerapps.io",
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MDlkMzcwOS1jMmY5LTRkMDYtOGVhNy04NTc5OTBjYTdlN2IiLCJlbWFpbCI6ImFkbWluQHhhbS5jb20uYXUiLCJ0eXAiOiJBZG1pbiIsIm5iZiI6MTY2MzA0NjEzMywiZXhwIjoxNjk0NTgyMTMzLCJpYXQiOjE2NjMwNDYxMzN9.zMyjBMXOR6wVAol0UcZC9jdN6p9M2eSJekBJzamXwbs');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getParentCategories: builder.query<IValue[], void>({
      query: () => {
        return {
          url: '/ParentCategories',
          method: 'GET',
        };
      },
    }),
  })
});

export const { useGetAllProductFilterQuery, useGetProductInfoQuery, useGetProductsQuery } = productsApi;
export const { useGetParentCategoriesQuery } = productsMicroService;
