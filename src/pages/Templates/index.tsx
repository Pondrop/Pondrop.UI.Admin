import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridFilterModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid-pro';

// Components
import Grid from 'components/Grid';
import { templatesColumns } from 'components/Grid/constants';
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import NewTemplateDialog from './components/NewTemplateDialog';

// Other variables / values
import { useAppDispatch, useAppSelector } from 'store';
import { useCreateSubmissionTemplateMutation, useLazyRefreshTemplatesQuery } from 'store/api/tasks/api';
import { templatesApi, useGetAllTemplateFilterQuery, useGetTemplatesQuery } from 'store/api/templates/api';
import {
  selectTemplates,
  setTemplatesFilter,
  setTemplatesSearchValue,
  setTemplatesSortValue,
  setDidCreateTemplate,
} from 'store/api/templates/slice';
import { IFacetValue, IFilterItem } from 'store/api/types';
import { INewTemplateDialogData } from './components/NewTemplateDialog/types';
import {
  CategoryBtnWrapper,
  ColAlignDiv,
  MainContent,
  RowAlignDiv,
  RowAlignWrapper,
  StyledCategoryBtn,
  StyledTitle,
} from '../styles';

const Templates: FunctionComponent = (): JSX.Element => {
  // States
  const templateFilterInitState = generateFilterInitState(templatesColumns);
  const [templateFilterItem, setTemplateFilterItem] = useState<IFilterItem[]>(templateFilterInitState);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);
  const [newTemplateData, setNewTemplateData] = useState<INewTemplateDialogData>({} as INewTemplateDialogData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    didCreateTemplate,
    filterItem = templateFilterItem,
    searchValue = '',
    sortValue,
  } = useAppSelector(selectTemplates);
  const { data, isFetching, refetch } = useGetTemplatesQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
  });

  // Dialog states
  const [isNewTemplateModalOpen, setIsNewTemplateModalOpen] = useState<boolean>(false);

  const gridData = data?.value ?? [];
  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllTemplateFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const [
    createTemplate,
    {
      data: createTemplateResponse,
      isSuccess: isCreateTemplateSuccess,
      reset: resetCreateTemplate,
      isLoading: isCreateTemplateLoading,
    },
  ] = useCreateSubmissionTemplateMutation();

  const [refreshTemplates, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] =
    useLazyRefreshTemplatesQuery();

  const menuData = {
    title: filterOptionsData?.['@search.facets']?.title,
    type: filterOptionsData?.['@search.facets']?.type,
    isForManualSubmissions: filterOptionsData?.['@search.facets']?.isForManualSubmissions,
    focus: filterOptionsData?.['@search.facets']?.focus,
    createdutc: filterOptionsData?.['@search.facets']?.createdutc,
    status: filterOptionsData?.['@search.facets']?.status,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize },
    sorting: { sortModel: [{ field: 'status', sort: 'asc' as GridSortDirection }] },
  };

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(setTemplatesFilter(templateFilterInitState));
    dispatch(setTemplatesSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(setTemplatesFilter(model.items as IFilterItem[]));
  };

  const handleSortModelChange = (model: GridSortModel) => {
    dispatch(
      setTemplatesSortValue({
        field: model[0]?.field,
        sort: model[0]?.sort,
      }),
    );
  };

  const handleNewTemplateModalOpen = () => {
    setIsNewTemplateModalOpen(true);
  };

  const handleNewTemplateModalClose = () => {
    setIsNewTemplateModalOpen(false);
  };

  const handleNewTemplateSubmit = (newTemplateData: INewTemplateDialogData) => {
    setNewTemplateData(newTemplateData);
    createTemplate({
      ...newTemplateData,
      isForManualSubmissions: true,
      status: 'draft',
      steps: [],
      iconFontFamily: 'MaterialIcons',
    });
  };

  const onPageChange = (page: number) => {
    setPageSkip(page * pageSize);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleOnFilterClick = (value: string, currColumn: string, currFilterItems: IFilterItem[]) => {
    if (!value) return;

    const columnValues = currFilterItems.find((filter) => filter.columnField === currColumn);
    const combinedValue = handleFilterStateChange(value, columnValues?.value ?? []);

    setPageSkip(0);

    const newAppliedFilters = currFilterItems.map((filter) => {
      if (filter.columnField === currColumn)
        return {
          ...filter,
          value: combinedValue,
        };
      else return filter;
    });

    dispatch(setTemplatesFilter(newAppliedFilters));
  };

  // Use Effects
  useEffect(() => {
    if (filterItem.length !== 0) setTemplateFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
  }, [data]);

  useEffect(() => {
    if ((!isRefreshFetching && isRefreshSuccess) || didCreateTemplate) {
      setTimeout(() => {
        dispatch(templatesApi.util.resetApiState());
        refetch();
        dispatch(setDidCreateTemplate(false));
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

  useEffect(() => {
    if (isCreateTemplateSuccess) {
      refreshTemplates();
      dispatch(setDidCreateTemplate(true));
      resetCreateTemplate();
      handleNewTemplateModalClose();

      navigate('new', {
        replace: false,
        state: { ...newTemplateData, id: createTemplateResponse?.id },
      });
    }
  }, [isCreateTemplateSuccess]);

  return (
    <MainContent paddingSide={92} paddingTop={16}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="templates-header">
            Templates
          </StyledTitle>
          <StyledTitle className="main-header" variant="caption">
            Last updated: 12th August, 2022 @ 10:01am
          </StyledTitle>
        </ColAlignDiv>
        <RowAlignWrapper style={{ height: '54px' }}>
          <CategoryBtnWrapper rightmargin={20}>
            <StyledCategoryBtn
              data-testid="add-template-btn"
              className="add-template-btn"
              variant="contained"
              disableElevation
              height={40}
              onClick={handleNewTemplateModalOpen}
            >
              + Create new template
            </StyledCategoryBtn>
          </CategoryBtnWrapper>
          <SearchField
            id="templates-search-field"
            value={''}
            isfullsize={false}
            width={321}
            onEnterPress={handleSearchDispatch}
            padding="16px 14px 14px"
          />
        </RowAlignWrapper>
      </RowAlignDiv>
      <Grid
        data={gridData}
        columns={templatesColumns}
        id="view-templates-grid"
        dataIdKey="id"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={templateFilterItem}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        isMenuLoading={isFilterOptionsFetching}
        searchValue={searchValue}
      />
      <NewTemplateDialog
        isOpen={isNewTemplateModalOpen}
        handleClose={handleNewTemplateModalClose}
        handleSubmit={handleNewTemplateSubmit}
        isLoading={isCreateTemplateLoading}
        errorMessage=""
      />
    </MainContent>
  );
};

export default Templates;
