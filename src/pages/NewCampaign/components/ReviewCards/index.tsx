import { ChangeEvent, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
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
import { IModalState } from 'pages/types';
import { campaignInfoTitles, campaignTypeId, campaignTemplateemplateId } from './constants';
import { StyledDatePicker } from './styles';
import { IReviewCardsInfo } from './types';

const ReviewCardsInfo = ({ data }: IReviewCardsInfo): JSX.Element => {
  const [campaignInfo, setCampaignInfo] = useState<IModalState>({} as IModalState);
  const [storeCompletion, setStoreCompletion] = useState<number>();
  const [endDate, setEndDate] = useState<Moment | null>(moment());

  const { selectedIds: selectedProductsIds } = useAppSelector(selectProducts);
  const { selectedIds: selectedCategoriesIds } = useAppSelector(selectCategories);
  const { selectedIds: selectedStoresIds } = useAppSelector(selectStores);

  const { data: categoryInfoData, isFetching } = useGetCategoryInfoQuery(
    { categoryId: String(selectedCategoriesIds?.[0]) ?? '' },
    { skip: data?.template !== '1' },
  );

  useEffect(() => {
    setCampaignInfo(data ?? {});
  }, [data]);

  const handleCompletionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreCompletion(Number(e.target.value));
  };

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
          {campaignTemplateemplateId[templateId as keyof typeof campaignTypeId]}
        </span>
      </ColAlignDiv>
    );
  };

  const getHeaderLabel = () => (campaignInfo?.template === '1' ? 'Category' : 'Products');

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
          <span className="row-label card-details">Completions per store</span>
          <div className="info-icon" style={{ marginLeft: '8px' }}>
            <Info />
          </div>
        </RowAlignWrapper>
        <StyledTextInput
          id="store-completion-input"
          margin="none"
          variant="outlined"
          type="number"
          value={storeCompletion}
          onChange={handleCompletionChange}
          sx={{ marginBottom: '20px' }}
          placeholder="Number of task completions per store"
        />
        <RowAlignWrapper>
          <span className="row-label card-details">Campaign end date</span>
          <div className="info-icon" style={{ marginLeft: '8px' }}>
            <Info />
          </div>
        </RowAlignWrapper>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StyledDatePicker
            renderInput={(props) => <TextField {...props} />}
            value={endDate}
            onChange={(value) => setEndDate(value as Moment)}
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
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
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
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
              </RowAlignWrapper>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {getSelectedNumber(
            (campaignInfo?.template === '1' ? selectedCategoriesIds?.length : selectedProductsIds?.length) ?? 0,
            campaignInfo?.template === '1',
          )}
        </StyledCard>
      </RowAlignWrapper>
      <RowAlignWrapper className="campaign-review">
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Stores
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
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
              <RowAlignWrapper>
                Set conditions
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
              </RowAlignWrapper>
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
