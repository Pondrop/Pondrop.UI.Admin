import { FunctionComponent, useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { GridFilterModel, GridSortDirection, GridSortModel } from '@mui/x-data-grid';

import { campaignsColumns } from 'components/Grid/constants';
import { IBasicFilter } from 'components/GridMenu/types';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetAllCampaignFilterQuery, useGetCampaignsQuery } from 'store/api/campaigns/api';
import {
  selectCampaigns,
  setCampaignsFilter,
  setCampaignsSearchValue,
  setCampaignsSortValue,
} from 'store/api/campaigns/slice';
import { submissionsMicroService, useLazyRefreshCampaignsQuery, useUpdateCampaignMutation } from 'store/api/tasks/api';
import { IFacetValue, IFilterItem, IValue } from 'store/api/types';
import { initialState } from 'store/api/constants';
import {
  CategoryBtnWrapper,
  ColAlignDiv,
  MainContent,
  RowAlignDiv,
  RowAlignWrapper,
  StyledCategoryBtn,
  StyledTitle,
} from '../styles';
import Grid from 'components/Grid';
import { handleFilterStateChange } from 'components/GridMenu/utils';
import SearchField from 'components/SearchField';
import CampaignDialog from './components/CampaignDialog';

const Campaigns: FunctionComponent = (): JSX.Element => {
  // States
  const [gridData, setGridData] = useState<IValue[]>([]);
  const [campaignFilterItem, setCampaignFilterItem] = useState<IFilterItem>(initialState.filterItem);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSkip, setPageSkip] = useState<number>(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { filterItem, searchValue = '', sortValue } = useAppSelector(selectCampaigns);
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
    campaignPublishedDate: filterOptionsData?.['@search.facets']?.campaignPublishedDate,
    campaignStatus: filterOptionsData?.['@search.facets']?.campaignStatus,
  };

  const [rowCount, setRowCount] = useState<number>(data?.['@odata.count'] ?? 0);

  const initialGridState = {
    pagination: { pageSize: 20 },
    sorting: { sortModel: [{ field: 'campaignPublishedDate', sort: 'desc' as GridSortDirection }] },
  };

  // Use Effects
  useEffect(() => {
    setCampaignFilterItem(filterItem);
  }, [filterItem]);

  useEffect(() => {
    setRowCount(data?.['@odata.count'] ?? 0);
    setGridData(data?.value ?? []);
  }, [data]);

  useEffect(() => {
    setIsSnackbarOpen(isUpdateCampaignSuccess);
    if (isUpdateCampaignSuccess) refreshCampaigns();
  }, [isUpdateCampaignSuccess]);

  useEffect(() => {
    if (!isRefreshFetching && isRefreshSuccess) {
      setTimeout(() => {
        dispatch(submissionsMicroService.util.resetApiState());
        refetch();
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

  // Handlers
  const handleSearchDispatch = (searchValue: string) => {
    dispatch(
      setCampaignsFilter({
        columnField: '',
        value: '',
        operatorValue: 'isAnyOf',
      }),
    );
    dispatch(setCampaignsSearchValue(searchValue));
  };

  const onFilterModelChange = (model: GridFilterModel) => {
    if (!model.items[0]) return;
    dispatch(
      setCampaignsFilter({
        columnField: model.items[0].columnField,
        value: model.items[0].value,
        operatorValue: model.items[0].operatorValue ?? 'isAnyOf',
      }),
    );
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

  const handleOnFilterClick = (value: string, currColumn: string, filters: IBasicFilter) => {
    if (!value) return;

    const combinedValue =
      filters.field === currColumn && Array.isArray(filters.value)
        ? handleFilterStateChange(value, filters.value)
        : [value];

    dispatch(
      setCampaignsFilter({
        columnField: currColumn,
        value: combinedValue,
        operatorValue: 'isAnyOf',
      }),
    );
  };

  const handleNewCampaign = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    resetUpdateCampaign();
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
            onEnterPress={handleSearchDispatch}
            padding="16px 14px 14px"
          />
        </RowAlignWrapper>
      </RowAlignDiv>
      <Grid
        data={gridData}
        columns={campaignsColumns}
        id="view-campaigns-grid"
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
      <CampaignDialog isOpen={isModalOpen} handleClose={handleModalClose} />
    </MainContent>
  );
};

export default Campaigns;
