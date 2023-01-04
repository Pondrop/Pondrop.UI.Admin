import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import moment from 'moment';

import { IApiResponse, IFilterItem, ISortItem } from '../types';

export const templatesApi = createApi({
  reducerPath: 'templatesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
    prepareHeaders: (headers) => {
      headers.set('api-key', 't9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTemplates: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem[], prevPageItems: number, pageSize: number }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10 } = arg;
        
        let filterQuery = '';
        let sortQuery = '';

        // FUTURE ENHANCEMENT: Take into account operatorValues other than isAnyOf
        // Currently limited to isAnyOf
        if (Array.isArray(filterItem) && filterItem.length > 0) {
          filterItem.forEach((filter, filterIndex) => {
            const filterValues = filter.value;
            if (Array.isArray(filterValues) && filter.columnField !== 'retailer') filterValues?.forEach((filterValue, index) => {
              if (filterIndex > 0 && filterQuery[filterQuery.length - 1] === ')') filterQuery = filterQuery.concat(' and ');
              if (index === 0) filterQuery = filterQuery.concat('(');
              if (index !== 0) filterQuery = filterQuery.concat(' or ');
              if (moment(filterValue, "YYYY-MM-DDTHH:mm:ssZ", true).isValid() || moment(filterValue, "YYYY-MM-DDTHH:mm:ss.sssZ", true).isValid()) filterQuery = filterQuery.concat(`${filter.columnField} eq ${filterValue}`);
              else if (filter.columnField === 'isForManualSubmissions') {
                const isForManualSubmissions = filterValue === 'Yes';
                filterQuery = filterQuery.concat(`${filter.columnField} eq ${isForManualSubmissions ? true : false}`);
              } else filterQuery = filterQuery.concat(`${filter.columnField} eq '${filterValue}'`);
              if (index === filterValues.length - 1) filterQuery = filterQuery.concat(')');
            });
          });
        }

        if (sortValue.sort) sortQuery = sortQuery.concat(`${sortValue.field} ${sortValue.sort}`);

        return {
          url: `/indexes/cosmosdb-index-submissiontemplate/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getAllTemplateFilter: builder.query<IApiResponse, { searchString: string }>({
      query: (arg) => {
        const { searchString } = arg;
        return {
          url: `/indexes/cosmosdb-index-submissiontemplate/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*&$count=true&facet=title,count:0,sort:value&facet=type,count:0,sort:value&facet=isForManualSubmissions,count:0,sort:value&facet=focus,count:0,sort:value&facet=createdUtc,count:0,sort:value&facet=status,count:0,sort:value`,
          method: 'GET',
        };
      },
    }),
    getFields: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem[], prevPageItems: number, pageSize: number }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10 } = arg;
        
        let filterQuery = '';
        let sortQuery = '';

        // FUTURE ENHANCEMENT: Take into account operatorValues other than isAnyOf
        // Currently limited to isAnyOf
        if (Array.isArray(filterItem) && filterItem.length > 0) {
          filterItem.forEach((filter, filterIndex) => {
            const filterValues = filter.value;
            if (Array.isArray(filterValues) && filter.columnField !== 'retailer') filterValues?.forEach((filterValue, index) => {
              if (filterIndex > 0 && filterQuery[filterQuery.length - 1] === ')') filterQuery = filterQuery.concat(' and ');
              if (index === 0) filterQuery = filterQuery.concat('(');
              if (index !== 0) filterQuery = filterQuery.concat(' or ');
              if (filter.columnField === 'maxValue') filterQuery = filterQuery.concat(`${filter.columnField} eq ${filterValue}`);
              else filterQuery = filterQuery.concat(`${filter.columnField} eq '${filterValue}'`);
              if (index === filterValues.length - 1) filterQuery = filterQuery.concat(')');
            });
          });
        }

        if (sortValue.sort) sortQuery = sortQuery.concat(`${sortValue.field} ${sortValue.sort}`);

        return {
          url: `/indexes/cosmosdb-index-fields/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getAllFieldFilter: builder.query<IApiResponse, { searchString: string }>({
      query: (arg) => {
        const { searchString } = arg;
        return {
          url: `/indexes/cosmosdb-index-fields/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*&$count=true&facet=label,count:0,sort:value&facet=fieldType,count:0,sort:value&facet=maxValue,count:0,sort:value`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAllFieldFilterQuery, useGetAllTemplateFilterQuery, useGetFieldsQuery, useGetTemplatesQuery } = templatesApi;
