import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse, IFilterItem, ISortItem, IViewResponse } from '../types';
import { ICreateProduct, ICreateProductRequest, IFullProductInfo, ISetCategories, ISetCategoriesRequest } from './types';

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
    getProducts: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem, prevPageItems: number, pageSize: number, parentCategory?: string, selectedCategories?: string[], baseCategory?: string, isNotLinkedProducts?: boolean }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10, parentCategory, selectedCategories = [], baseCategory, isNotLinkedProducts = false } = arg;

        let filterQuery = '';
        let sortQuery = '';

        if (parentCategory && parentCategory !== 'all' && parentCategory !== 'uncategorised') {
          filterQuery = filterQuery.concat(`parentCategoryId eq '${parentCategory}'`);
        } else if (parentCategory && parentCategory === 'uncategorised') {
          filterQuery = filterQuery.concat(`parentCategoryId eq null`);
        }

        if (baseCategory) {
          if (parentCategory && parentCategory !== 'all') filterQuery = filterQuery.concat(' and ');
          filterQuery = filterQuery.concat(`categories/any(t: t/name ${isNotLinkedProducts ? 'ne' : 'eq'} '${baseCategory}')`);
          if (isNotLinkedProducts) filterQuery = filterQuery.concat(` or categoryNames eq  ''`);
        }

        if (selectedCategories?.length > 0) {
          if ((parentCategory && parentCategory !== 'all') || baseCategory) filterQuery = filterQuery.concat(' and ');
          selectedCategories.forEach((categ, index) => {
            filterQuery = filterQuery.concat(`categories/any(t: t/name eq '${categ}')`);
            if (index !== selectedCategories?.length - 1) filterQuery = filterQuery.concat(' or ');
          });
        }

        if (Array.isArray(filterItem.value) && filterItem.value.length > 0 && (!parentCategory || filterItem.columnField !== 'categories')) {
          filterItem.value.forEach((filter, index) => {
            if (index === 0 && parentCategory) filterQuery = filterQuery.concat(' and ');
            if (index !== 0) filterQuery = filterQuery.concat(' or ');
            filterQuery = filterQuery.concat(`${filterItem.columnField} eq '${filter}'`);
          });
        } else if (!Array.isArray(filterItem.value) && filterItem.value) filterQuery = filterQuery.concat(`${filterItem.columnField} eq ${filterItem.value}`);

        if (sortValue.sort) sortQuery = sortQuery.concat(`${sortValue.field} ${sortValue.sort}`);

        return {
          url: `/indexes/cosmosdb-index-allproduct/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}&searchMode=all&queryType=full`,
          method: 'GET',
        };
      },
    }),
    getAllProductCount: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/cosmosdb-index-allproduct/docs?api-version=2021-04-30-Preview&search=*&$count=true&$skip=0`,
          method: 'GET',
        };
      },
    }),
    getProductInfo: builder.query<IApiResponse, { productId: string }>({
      query: (arg) => {
        const { productId } = arg;
        return {
          url: `/indexes/cosmosdb-index-allproduct/docs?api-version=2021-04-30-Preview${`&$filter=id eq '${productId}'`}`,
          method: 'GET',
        };
      },
    }),
    getAllProductFilter: builder.query<IApiResponse, { searchString: string, parentCategory?: string, selectedCategory?: string, isNotLinkedProducts?: boolean }>({
      query: (arg) => {
        const { searchString, parentCategory, selectedCategory, isNotLinkedProducts = false } = arg;

        let filterQuery = '';

        if (parentCategory) {
          if (parentCategory !== 'all' && parentCategory !== 'uncategorised') filterQuery = filterQuery.concat(`parentCategoryId eq '${parentCategory}'`);
          if (parentCategory === 'uncategorised') filterQuery = filterQuery.concat(`parentCategoryId eq null`);
          if (selectedCategory) filterQuery = filterQuery.concat(` and categories/any(t: t/name eq '${selectedCategory}')`);
        }

        if (isNotLinkedProducts) filterQuery = filterQuery.concat(`categories/any(t: t/name ne '${selectedCategory}') or categoryNames eq  ''`);

        return {
          url: `/indexes/cosmosdb-index-allproduct/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&facet=name,count:0,sort:value&facet=barcodeNumber,count:0,sort:value&facet=categories/name,count:0,sort:value`,
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
    getParentCategories: builder.query<IViewResponse, void>({
      query: () => {
        return {
          url: '/ParentCategories?limit=-1',
          method: 'GET',
        };
      },
    }),
    getFullProductInfo: builder.query<IFullProductInfo, { productId: string }>({
      query: (arg) => {
        const { productId } = arg;
        return {
          url: `/Product/${productId}/full`,
          method: 'GET',
        };
      },
    }),
    addProduct: builder.mutation<ICreateProduct, ICreateProductRequest>({
      query: (arg) => {
        return {
          url: `/Product/createFull`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    updateLinkedCategories: builder.mutation<ISetCategories[], ISetCategoriesRequest>({
      query: (arg) => {
        return {
          url: `/ProductCategory/setcategories`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    refreshProducts: builder.query<void, void>({
      query: () => {
        return {
          url: `/Product/indexer/run`,
          method: 'GET',
        };
      },
    }),
  })
});

export const { useGetAllProductCountQuery, useGetAllProductFilterQuery, useGetProductInfoQuery, useGetProductsQuery, useLazyGetAllProductFilterQuery, useLazyGetProductsQuery, useLazyGetProductInfoQuery } = productsApi;
export const { useAddProductMutation, useGetFullProductInfoQuery, useGetParentCategoriesQuery, useLazyRefreshProductsQuery, useUpdateLinkedCategoriesMutation } = productsMicroService;
