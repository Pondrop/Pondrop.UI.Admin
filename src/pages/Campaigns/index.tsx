import { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { GridFilterModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid-pro';

// Components
import Grid from 'components/Grid';
import SearchField from 'components/SearchField';
import CampaignDialog from './components/CampaignDialog';

// Constants
import { campaignsColumns } from 'components/Grid/constants';
import { initialModalData } from './components/CampaignDialog/constants';

// Store / APIs
import { useAppDispatch, useAppSelector } from 'store';
import { categoriesApi } from 'store/api/categories/api';
import { useGetAllCampaignFilterQuery, useGetCampaignsQuery } from 'store/api/campaigns/api';
import { productsApi } from 'store/api/products/api';
import { storeApi } from 'store/api/stores/api';
import {
  selectCampaigns,
  setCampaignsFilter,
  setCampaignsSearchValue,
  setCampaignsSortValue,
  setDidCreateCampaign,
} from 'store/api/campaigns/slice';
import { resetCategoriesToInitialState } from 'store/api/categories/slice';
import { resetProductToInitialState } from 'store/api/products/slice';
import { resetStoresToInitialState } from 'store/api/stores/slice';
import {
  submissionsMicroService,
  useCreateCampaignMutation,
  useLazyRefreshCampaignsQuery,
  useUpdateCampaignMutation,
} from 'store/api/tasks/api';

// Styles
import {
  CategoryBtnWrapper,
  ColAlignDiv,
  MainContent,
  RowAlignDiv,
  RowAlignWrapper,
  StyledCategoryBtn,
  StyledTitle,
} from '../styles';

// Types
import { IFacetValue, IFilterItem, IValue } from 'store/api/types';
import { CATEGORY_FOCUS_ID } from 'pages/types';
import { ICreateCampaignModalData, IModalData } from './components/CampaignDialog/types';

// Utils
import { generateFilterInitState, handleFilterStateChange } from 'components/GridMenu/utils';

const Campaigns: FunctionComponent = (): JSX.Element => {
  // States
  const campaignsFilterInitState = generateFilterInitState(campaignsColumns);
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [campaignFilterItem, setCampaignFilterItem] = useState<IFilterItem[]>(campaignsFilterInitState);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [newCampaignData, setNewCampaignData] = useState<IModalData>(initialModalData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { didCreateCampaign, filterItem, searchValue = '', sortValue } = useAppSelector(selectCampaigns);
  const { data, isFetching, refetch } = useGetCampaignsQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: pageSkip,
    pageSize,
  });

  const { data: filterOptionsData, isFetching: isFilterOptionsFetching } = useGetAllCampaignFilterQuery(
    { searchString: searchValue },
    { skip: !gridData.length },
  );

  const [
    createCampaign,
    {
      data: createCampaignResponse,
      isSuccess: isCreateCampaignSuccess,
      reset: resetCreateCampaign,
      isLoading: isCreateCampaignLoading,
    },
  ] = useCreateCampaignMutation();

  // Fixed cache key allows us to access isSuccess and reset from the same API endpoint used in a separate file
  const [, { isSuccess: isUpdateCampaignSuccess, reset: resetUpdateCampaign }] = useUpdateCampaignMutation({
    fixedCacheKey: 'new-campaign-mutation',
  });

  const [refreshCampaigns, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] =
    useLazyRefreshCampaignsQuery();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const menuData = {
    name: filterOptionsData?.['@search.facets']?.name,
    selectedTemplateTitle: filterOptionsData?.['@search.facets']?.selectedTemplateTitle,
    campaignType: filterOptionsData?.['@search.facets']?.campaignType,
    numberOfStores: filterOptionsData?.['@search.facets']?.numberOfStores,
    completions: filterOptionsData?.['@search.facets']?.completions,
    campaignStartDate: filterOptionsData?.['@search.facets']?.campaignStartDate,
    campaignEndDate: filterOptionsData?.['@search.facets']?.campaignEndDate,
    campaignStatus: filterOptionsData?.['@search.facets']?.campaignStatus,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize: 20 },
    sorting: { sortModel: [{ field: 'campaignStartDate', sort: 'desc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    if (filterItem.length !== 0) setCampaignFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
    setGridData(data?.value ?? []);
  }, [data]);

  useEffect(() => {
    setIsSnackbarOpen(isUpdateCampaignSuccess);
    if (isUpdateCampaignSuccess) refreshCampaigns();
  }, [isUpdateCampaignSuccess]);

  // When refresh campaign is called and is finished, reset API and refetch data after 7s
  // 7s was determined to be the time it takes to get the correct values from the search index
  useEffect(() => {
    if ((!isRefreshFetching && isRefreshSuccess) || didCreateCampaign) {
      setTimeout(() => {
        dispatch(submissionsMicroService.util.resetApiState());
        refetch();
        dispatch(setDidCreateCampaign(false));
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

  useEffect(() => {
    if (isCreateCampaignSuccess) {
      refreshCampaigns();
      dispatch(setDidCreateCampaign(true));
      if (newCampaignData?.template === CATEGORY_FOCUS_ID) {
        dispatch(resetCategoriesToInitialState());
        dispatch(categoriesApi.util.resetApiState());
      } else {
        dispatch(resetProductToInitialState());
        dispatch(productsApi.util.resetApiState());
      }

      dispatch(resetStoresToInitialState());
      dispatch(storeApi.util.resetApiState());
      resetCreateCampaign();

      navigate('new', {
        replace: false,
        state: { ...newCampaignData, id: createCampaignResponse?.id },
      });
    }
  }, [isCreateCampaignSuccess]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(setCampaignsFilter(campaignsFilterInitState));
    dispatch(setCampaignsSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(setCampaignsFilter(model.items as IFilterItem[]));
  };

  const handleSortModelChange = (model: GridSortModel) => {
    dispatch(
      setCampaignsSortValue({
        field: model[0]?.field,
        sort: model[0]?.sort,
      }),
    );
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

    const newAppliedFilters = currFilterItems.map((filter) => {
      if (filter.columnField === currColumn)
        return {
          ...filter,
          value: combinedValue,
        };
      else return filter;
    });

    setPageSkip(0);

    dispatch(setCampaignsFilter(newAppliedFilters));
  };

  const handleNewCampaign = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (campaignModalData: ICreateCampaignModalData) => {
    setNewCampaignData({
      name: campaignModalData.name,
      campaignType: campaignModalData.campaignType,
      template: campaignModalData.selectedTemplateIds[0],
    });
    createCampaign({
      ...campaignModalData,
      campaignStatus: 'draft',
      publicationlifecycleId: '1',
    });
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    resetUpdateCampaign();
    dispatch(setDidCreateCampaign(false));
  };

  return (
    <MainContent paddingSide={92} paddingTop={16}>
      <RowAlignDiv>
        <ColAlignDiv>
          <StyledTitle className="main-header" variant="h5" gutterBottom data-testid="stores-header">
            Campaigns
          </StyledTitle>
        </ColAlignDiv>
        <RowAlignWrapper style={{ height: '54px' }}>
          <CategoryBtnWrapper rightmargin={20}>
            <StyledCategoryBtn
              data-testid="new-campaign-btn"
              className="new-campaign-btn"
              variant="contained"
              disableElevation
              height={40}
              onClick={handleNewCampaign}
            >
              + New campaign
            </StyledCategoryBtn>
          </CategoryBtnWrapper>
          <SearchField
            id="campaign-search-field"
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
        columns={campaignsColumns}
        id="view-campaigns-grid"
        dataIdKey="id"
        isFetching={isFetching}
        onFilterModelChange={onFilterModelChange}
        filterItem={campaignFilterItem}
        handleOnFilterClick={handleOnFilterClick}
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        menuData={menuData as IFacetValue}
        onSortModelChange={handleSortModelChange}
        initialState={initialGridState}
        isMenuLoading={isFilterOptionsFetching}
        searchValue={''}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          Campaign published successfully
        </Alert>
      </Snackbar>
      <CampaignDialog
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        handleSubmit={handleModalSubmit}
        isCreateCampaignLoading={isCreateCampaignLoading}
      />
    </MainContent>
  );
};

export default Campaigns;
