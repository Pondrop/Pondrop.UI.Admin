import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Tooltip } from '@mui/material';
import { Info } from '@mui/icons-material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';

import { useAppSelector } from 'store';
import { useGetCategoryInfoQuery } from 'store/api/categories/api';
import { selectCategories } from 'store/api/categories/slice';
import { selectProducts } from 'store/api/products/slice';
import { selectStores } from 'store/api/stores/slice';
import {
  ColAlignDiv,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCard,
  StyledCardTitle,
  StyledTextInput,
} from 'pages/styles';
import { CATEGORY_FOCUS_ID, IModalState } from 'pages/types';
import { campaignInfoTitles, campaignTypeId, campaignTemplateId, tooltipContent } from './constants';
import { StyledDatePicker } from './styles';
import { IReviewCardsInfo } from './types';

const ReviewCardsInfo = ({
  data,
  onStoreCompletionChange,
  onStartDateChange,
  onEndDateChange,
}: IReviewCardsInfo): JSX.Element => {
  const [campaignInfo, setCampaignInfo] = useState<IModalState>({} as IModalState);
  const [storeCompletion, setStoreCompletion] = useState<string>('');
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const { selectedIds: selectedProductsIds } = useAppSelector(selectProducts);
  const { selectedIds: selectedCategoriesIds } = useAppSelector(selectCategories);
  const { selectedIds: selectedStoresIds } = useAppSelector(selectStores);

  const { data: categoryInfoData, isFetching } = useGetCategoryInfoQuery(
    { categoryField: 'lowerLevelCategoryId', categoryId: String(selectedCategoriesIds?.[0]) ?? '' },
    { skip: data?.template !== CATEGORY_FOCUS_ID },
  );

  useEffect(() => {
    setCampaignInfo(data ?? {});
  }, [data]);

  const handleCompletionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreCompletion(e.target.value);
    onStoreCompletionChange(Number(e.target.value));
  };

  const handleStartDateChange = (value: unknown) => {
    setStartDate(value as Moment);
    onStartDateChange(value as Moment);
  };

  const handleEndDateChange = (value: unknown) => {
    setEndDate(value as Moment);
    onEndDateChange(value as Moment);
  };

  useEffect(() => {
    handleStartDateChange(startDate);
  }, []);

  const renderDetails = () => {
    const typeId = campaignInfo?.[campaignInfoTitles[1].field as keyof IModalState];
    const templateId = campaignInfo?.[campaignInfoTitles[2].field as keyof IModalState];
    return (
      <ColAlignDiv>
        <span className="row-label card-details">{campaignInfoTitles[0].label}</span>
        <span className="row-value singleline card-details" style={{ marginBottom: '12px', maxWidth: '100%' }}>
          {campaignInfo?.[campaignInfoTitles[0].field as keyof IModalState]}
        </span>
        <span className="row-label card-details">{campaignInfoTitles[1].label}</span>
        <span className="row-value singleline card-details" style={{ marginBottom: '12px', maxWidth: '100%' }}>
          {campaignTypeId[typeId as keyof typeof campaignTypeId]}
        </span>
        <span className="row-label card-details">{campaignInfoTitles[2].label}</span>
        <span className="row-value singleline card-details" style={{ marginBottom: '12px', maxWidth: '100%' }}>
          {campaignTemplateId[templateId as keyof typeof campaignTemplateId]}
        </span>
      </ColAlignDiv>
    );
  };

  const getHeaderLabel = () => (campaignInfo?.template === CATEGORY_FOCUS_ID ? 'Category' : 'Products');

  const getCategoryLabel = () => {
    if (isFetching) return '...';
    else return categoryInfoData?.value[0]?.categoryName;
  };

  const getSelectedNumber = (value: number, isCategory: boolean) => {
    return (
      <span className="row-value singleline card-details" style={{ marginBottom: '12px', maxWidth: '100%' }}>
        {isCategory ? getCategoryLabel() : value}
      </span>
    );
  };

  const renderConditions = () => {
    return (
      <ColAlignDiv>
        <RowAlignWrapper>
          <span className="card-details" style={{ fontWeight: 600 }}>
            Completions per store
          </span>
          <Tooltip title={tooltipContent.completion} placement="top">
            <div className="info-icon" style={{ marginLeft: '8px' }}>
              <Info />
            </div>
          </Tooltip>
        </RowAlignWrapper>
        <StyledTextInput
          id="store-completion-input"
          margin="none"
          variant="outlined"
          type="number"
          value={storeCompletion ? Number(storeCompletion) : ''}
          onChange={handleCompletionChange}
          sx={{ marginBottom: '20px' }}
          placeholder="Number of task completions per store"
        />
        <RowAlignWrapper>
          <span className="card-details" style={{ fontWeight: 600 }}>
            Campaign start date
          </span>
          <Tooltip title={tooltipContent.startDate} placement="top">
            <div className="info-icon" style={{ marginLeft: '8px' }}>
              <Info />
            </div>
          </Tooltip>
        </RowAlignWrapper>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StyledDatePicker
            renderInput={(props) => (
              <TextField {...props} inputProps={{ ...props.inputProps, placeholder: 'dd/mm/yyyy hh:mm (a|p)m' }} />
            )}
            value={startDate ? moment(startDate) : null}
            onChange={handleStartDateChange}
            inputFormat="DD/MM/YYYY hh:mm a"
            disablePast
            PaperProps={{
              sx: {
                border: '1px solid rgba(0, 0, 0, 0.24) !important',
                borderRadius: '8px !important',
              },
            }}
            PopperProps={{
              sx: {
                inset: 'auto auto 0px 90px !important',
              },
            }}
          />
        </LocalizationProvider>
        <RowAlignWrapper>
          <span className="card-details" style={{ fontWeight: 600 }}>
            Campaign end date
          </span>
          <Tooltip title={tooltipContent.endDate} placement="top">
            <div className="info-icon" style={{ marginLeft: '8px' }}>
              <Info />
            </div>
          </Tooltip>
        </RowAlignWrapper>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StyledDatePicker
            renderInput={(props) => (
              <TextField {...props} inputProps={{ ...props.inputProps, placeholder: 'dd/mm/yyyy hh:mm (a|p)m' }} />
            )}
            value={endDate}
            onChange={handleEndDateChange}
            inputFormat="DD/MM/YYYY hh:mm a"
            minDate={startDate}
            PaperProps={{
              sx: {
                border: '1px solid rgba(0, 0, 0, 0.24) !important',
                borderRadius: '8px !important',
              },
            }}
            PopperProps={{
              sx: {
                inset: 'auto auto 0px 90px !important',
              },
            }}
          />
        </LocalizationProvider>
      </ColAlignDiv>
    );
  };

  return (
    <div>
      <RowAlignWrapper className="campaign-review" style={{ margin: '8px 64px 0 32px !important' }}>
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Campaign
                <Tooltip title={tooltipContent.campaign} placement="top">
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderDetails()}
        </StyledCard>
      </RowAlignWrapper>
      <RowAlignWrapper className="campaign-review">
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                {getHeaderLabel()}
                <Tooltip
                  title={
                    campaignInfo?.template === CATEGORY_FOCUS_ID ? tooltipContent.category : tooltipContent.product
                  }
                  placement="top"
                >
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {getSelectedNumber(
            (campaignInfo?.template === CATEGORY_FOCUS_ID
              ? selectedCategoriesIds?.length
              : selectedProductsIds?.length) ?? 0,
            campaignInfo?.template === CATEGORY_FOCUS_ID,
          )}
        </StyledCard>
      </RowAlignWrapper>
      <RowAlignWrapper className="campaign-review">
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Stores
                <Tooltip title={tooltipContent.store} placement="top">
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {getSelectedNumber(selectedStoresIds?.length ?? 0, false)}
        </StyledCard>
      </RowAlignWrapper>
      <RowAlignWrapper className="last-review">
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>Set conditions</RowAlignWrapper>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          <div style={{ marginBottom: '24px', maxWidth: '100%' }}>
            <span className="row-value singleline card-details">
              Define how many shoppers will be offered and under what conditions.
            </span>
          </div>
          {renderConditions()}
        </StyledCard>
      </RowAlignWrapper>
    </div>
  );
};

export default ReviewCardsInfo;
