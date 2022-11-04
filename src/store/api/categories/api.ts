import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse, IFilterItem, ISortItem } from '../types';
import { ICategory, ICategoryGrouping, ICreateCategoryRequest, ICreateCategGroupingRequest } from './types';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
    prepareHeaders: (headers) => {
      headers.set('api-key', 't9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem, prevPageItems: number, pageSize: number }>({
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
          url: `/indexes/cosmosdb-index-categorygroup/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getCategoryInfo: builder.query<IApiResponse, { categoryField: string, categoryId: string }>({
      query: (arg) => {
        const { categoryField, categoryId } = arg;
        return {
          url: `/indexes/cosmosdb-index-categorygroup/docs?api-version=2021-04-30-Preview${`&$filter=${categoryField} eq '${categoryId}'`}`,
          method: 'GET',
        };
      },
    }),
    getAllCategoriesFilter: builder.query<IApiResponse, { searchString: string }>({
      query: (arg) => {
        const { searchString } = arg;
        return {
          url: `/indexes/cosmosdb-index-categorygroup/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*&$count=true&facet=categoryName,count:0,sort:value&facet=parentName,count:0,sort:value`,
          method: 'GET',
        };
      },
    }),
    getParentCategories: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: `/indexes/cosmosdb-index-category/docs?api-version=2021-04-30-Preview&$filter=type eq 'parent'&$orderby=name asc`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const categoriesMicroService = createApi({
  reducerPath: 'categoriesMicroService',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://product-service.ashyocean-bde16918.australiaeast.azurecontainerapps.io",
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MDlkMzcwOS1jMmY5LTRkMDYtOGVhNy04NTc5OTBjYTdlN2IiLCJlbWFpbCI6ImFkbWluQHhhbS5jb20uYXUiLCJ0eXAiOiJBZG1pbiIsIm5iZiI6MTY2MzA0NjEzMywiZXhwIjoxNjk0NTgyMTMzLCJpYXQiOjE2NjMwNDYxMzN9.zMyjBMXOR6wVAol0UcZC9jdN6p9M2eSJekBJzamXwbs');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation<ICategory, ICreateCategoryRequest>({
      query: (arg) => {
        return {
          url: `/Category/create`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    createCategoryGrouping: builder.mutation<ICategoryGrouping, ICreateCategGroupingRequest>({
      query: (arg) => {
        return {
          url: `/CategoryGrouping/create`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    refreshCategories: builder.query<void, void>({
      query: () => {
        return {
          url: `/CategoryGrouping/indexer/run`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAllCategoriesFilterQuery, useGetCategoriesQuery, useGetCategoryInfoQuery, useGetParentCategoriesQuery } = categoriesApi;
export const { useCreateCategoryMutation, useCreateCategoryGroupingMutation, useLazyRefreshCategoriesQuery } = categoriesMicroService;
