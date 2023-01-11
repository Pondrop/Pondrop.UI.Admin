import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import moment from 'moment';

import { IApiResponse, IFilterItem, ISortItem, IViewResponse } from '../types';
import { IAddTemplateStep, IAddTemplateStepResponse, ICampaign, ICreateCampaignRequest, ICreateSubmissionTemplate, ICreateSubmissionTemplateResponse, ISubmissionDetailsResponse, IUpdateCampaignRequest, IUpdateSubmissionTemplate, IUpdateSubmissionTemplateResponse } from './types';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://pondropsearchstandard.search.windows.net",
    prepareHeaders: (headers) => {
      headers.set('api-key', 't9qQq8k9bXhsR4VoCbJAIHYwkBrSTpE03KMKR3Kp6MAzSeAyv0pe');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<IApiResponse, { searchString: string, sortValue: ISortItem, filterItem: IFilterItem[], prevPageItems: number, pageSize: number }>({
      query: (arg) => {
        const { searchString, sortValue, filterItem, prevPageItems = 0, pageSize = 10 } = arg;

        let filterQuery = '';
        let sortQuery = '';

        // FUTURE ENHANCEMENT: Take into account operatorValues other than isAnyOf
        // Currently limited to isAnyOf
        if (Array.isArray(filterItem) && filterItem.length > 0) {
          filterItem.forEach((filter, filterIndex) => {
            const filterValues = filter.value;
            if (Array.isArray(filterValues)) filterValues?.forEach((filterValue, index) => {
              if (filterIndex > 0 && filterQuery[filterQuery.length - 1] === ')') filterQuery = filterQuery.concat(' and ');
              if (index === 0) filterQuery = filterQuery.concat('(');
              if (index !== 0) filterQuery = filterQuery.concat(' or ');
              if (moment(filterValue, "YYYY-MM-DDTHH:mm:ssZ", true).isValid() || moment(filterValue, "YYYY-MM-DDTHH:mm:ss.sssZ", true).isValid()) filterQuery = filterQuery.concat(`${filter.columnField} eq ${filterValue}`);
              else filterQuery = filterQuery.concat(`${filter.columnField} eq '${filterValue}'`);
              if (index === filterValues.length - 1) filterQuery = filterQuery.concat(')');
            });
          });
        }

        if (sortValue.sort) sortQuery = sortQuery.concat(`${sortValue.field} ${sortValue.sort}`);

        return {
          url: `/indexes/cosmosdb-index-submission/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*${filterQuery && `&$filter=${encodeURIComponent(filterQuery)}`}&$count=true&$skip=${prevPageItems}&$top=${pageSize}${sortQuery && `&$orderby=${sortQuery}`}`,
          method: 'GET',
        };
      },
    }),
    getAllTaskFilter: builder.query<IApiResponse, { searchString: string }>({
      query: (arg) => {
        const { searchString } = arg;
        return {
          url: `/indexes/cosmosdb-index-submission/docs?api-version=2021-04-30-Preview&search=${searchString && encodeURIComponent(searchString)}*&$count=true&facet=taskType,count:0,sort:value&facet=submittedUtc,count:0,sort:value&facet=retailerName,count:0,sort:value&facet=storeName,count:0,sort:value`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const submissionsMicroService = createApi({
  reducerPath: 'submissionsMicroService',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://template-submission-service.ashyocean-bde16918.australiaeast.azurecontainerapps.io",
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MDlkMzcwOS1jMmY5LTRkMDYtOGVhNy04NTc5OTBjYTdlN2IiLCJlbWFpbCI6ImFkbWluQHhhbS5jb20uYXUiLCJ0eXAiOiJBZG1pbiIsIm5iZiI6MTY2MzA0NjEzMywiZXhwIjoxNjk0NTgyMTMzLCJpYXQiOjE2NjMwNDYxMzN9.zMyjBMXOR6wVAol0UcZC9jdN6p9M2eSJekBJzamXwbs');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFields: builder.query<IViewResponse, void>({
      query: () => {
        return {
          url: `/Field?limit=-1`,
          method: 'GET',
        };
      },
    }),
    getSubmissionInfo: builder.query<ISubmissionDetailsResponse, { submissionId: string }>({
      query: (arg) => {
        const { submissionId } = arg;
        return {
          url: `/Submission/${submissionId}`,
          method: 'GET',
        };
      },
    }),
    getSubmissionTemplates: builder.query<IViewResponse, void>({
      query: () => {
        return {
          url: `/SubmissionTemplate/active?limit=-1`,
          method: 'GET',
        };
      },
    }),
    getSubmissionTemplateInfo: builder.query<ICreateSubmissionTemplateResponse, { submissionId: string }>({
      query: (arg) => {
        const { submissionId } = arg;
        return {
          url: `/SubmissionTemplate/${submissionId}`,
          method: 'GET',
        };
      },
    }),
    createSubmissionTemplate: builder.mutation<ICreateSubmissionTemplateResponse, ICreateSubmissionTemplate>({
      query: (arg) => {
        return {
          url: `/SubmissionTemplate/create`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    addTemplateStep: builder.mutation<IAddTemplateStepResponse, IAddTemplateStep>({
      query: (arg) => {
        return {
          url: `/SubmissionTemplate/step/add`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    updateTemplate: builder.mutation<IUpdateSubmissionTemplateResponse, IUpdateSubmissionTemplate>({
      query: (arg) => {
        return {
          url: `/SubmissionTemplate/update`,
          method: 'PUT',
          body: JSON.stringify(arg),
        };
      },
    }),
    refreshTemplates: builder.query<void, void>({
      query: () => {
        return {
          url: `/SubmissionTemplate/indexer/run`,
          method: 'GET',
        };
      },
    }),
    createCampaign: builder.mutation<ICampaign, ICreateCampaignRequest>({
      query: (arg) => {
        return {
          url: `/Campaign/create`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
    }),
    updateCampaign: builder.mutation<ICampaign, IUpdateCampaignRequest>({
      query: (arg) => {
        return {
          url: `/Campaign/update`,
          method: 'PUT',
          body: JSON.stringify(arg),
        };
      },
    }),
    refreshCampaigns: builder.query<void, void>({
      query: () => {
        return {
          url: `/Campaign/indexer/run`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAllTaskFilterQuery, useGetTasksQuery } = tasksApi;
export const { useAddTemplateStepMutation, useCreateCampaignMutation, useCreateSubmissionTemplateMutation, useGetFieldsQuery, useGetSubmissionInfoQuery, useGetSubmissionTemplateInfoQuery, useGetSubmissionTemplatesQuery, useLazyRefreshCampaignsQuery, useLazyRefreshTemplatesQuery, useUpdateCampaignMutation, useUpdateTemplateMutation } = submissionsMicroService;
