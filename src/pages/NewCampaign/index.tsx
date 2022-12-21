import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { Tab } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

// Components
import ReviewCardsInfo from './components/ReviewCards';
import StepGrid from './components/StepGrid';
import StoreGrid from './components/StoreGrid';

// Store / APIs
import { useAppSelector } from 'store';
import { newCampaignInitialState } from 'store/api/campaigns/initialState';
import { selectCategories } from 'store/api/categories/slice';
import { selectProducts } from 'store/api/products/slice';
import { selectStores } from 'store/api/stores/slice';
import { useUpdateCampaignMutation } from 'store/api/tasks/api';

// Styles
import {
  ColAlignDiv,
  ContentDetails,
  SpaceBetweenDiv,
  StyledBreadcrumbs,
  StyledCard,
  StyledCategoryBtn,
  StyleOutlinedBtn,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../styles';
import { CircleDiv, StyledBox, StyledSteps, TabLabelTypography } from './styles';

// Types
import { IUpdateCampaignRequest } from 'store/api/tasks/types';
import { CATEGORY_FOCUS_ID, IModalState } from 'pages/types';

// Utils
import { renderLoader } from 'pages/utils';

const NewCampaign: FunctionComponent = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [requestData, setRequestData] = useState<IUpdateCampaignRequest>(newCampaignInitialState);
  const [isPublish, setIsPublish] = useState<boolean>(false);

  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();

  // API values
  const state = location?.state as IModalState;

  const { selectedIds: selectedProductsIds } = useAppSelector(selectProducts);
  const { selectedIds: selectedCategoriesIds } = useAppSelector(selectCategories);
  const { selectedIds: selectedStoresIds } = useAppSelector(selectStores);

  const [
    updateCampaign,
    { isSuccess: isUpdateCampaignSuccess, reset: resetUpdateCampaign, isLoading: isUpdateCampaignLoading },
  ] = useUpdateCampaignMutation({ fixedCacheKey: 'new-campaign-mutation' });

  // Handlers
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentStep(newValue);
  };

  const handlePrevious = () => navigate(-1);

  const handleUpdateFocus = () => {
    let focusIds;
    let focusProperty;
    if (state?.template === CATEGORY_FOCUS_ID) {
      focusIds = selectedCategoriesIds?.slice();
      focusProperty = 'campaignFocusCategoryIds';
    } else {
      focusIds = selectedProductsIds?.slice();
      focusProperty = 'campaignFocusProductIds';
    }

    const requestBody = {
      ...requestData,
      [focusProperty]: focusIds as string[],
    };

    setRequestData(requestBody);
    updateCampaign(requestBody);
    setCurrentStep((prevState) => prevState + 1);
  };

  const handleUpdateStores = () => {
    const requestBody = {
      ...requestData,
      storeIds: selectedStoresIds as string[],
    };

    setRequestData(requestBody);
    updateCampaign(requestBody);
    setCurrentStep((prevState) => prevState + 1);
  };

  const handleUpdateStoreCompletion = (value: number) => {
    const requestBody = {
      ...requestData,
      requiredSubmissions: value,
    };

    setRequestData(requestBody);
  };

  const handleUpdateStartDate = (value: Moment) => {
    const requestBody = {
      ...requestData,
      campaignStartDate: String(moment(value).format('YYYY-MM-DDTHH:mm:ssZ')),
    };

    setRequestData(requestBody);
  };

  const handleUpdateEndDate = (value: Moment) => {
    const requestBody = {
      ...requestData,
      campaignEndDate: String(moment(value).format('YYYY-MM-DDTHH:mm:ssZ')),
    };

    setRequestData(requestBody);
  };

  const handlePublishCampaign = () => {
    const requestBody = {
      ...requestData,
      campaignStatus: 'live',
      campaignPublishedDate: String(moment().format('YYYY-MM-DDTHH:mm:ssZ')),
    };

    setIsPublish(true);
    updateCampaign(requestBody);
  };

  const handleBackButton = () => {
    setCurrentStep((prevState) => prevState - 1);
  };

  useEffect(() => {
    if (isUpdateCampaignSuccess) {
      if (isPublish) navigate(-1);
      else resetUpdateCampaign();
    }
  }, [isUpdateCampaignSuccess]);

  useEffect(() => {
    setRequestData((oldValue) => ({
      ...oldValue,
      id: state?.id,
      name: state?.name,
      campaignType: state?.campaignType,
      selectedTemplateIds: [state?.template],
      campaignStartDate: null,
      campaignEndDate: null,
    }));
  }, []);

  const getStepType = () => {
    if (currentStep === 0) return state?.template === CATEGORY_FOCUS_ID ? 'category' : 'product';
    else return 'store';
  };

  const renderHeader = () => {
    return (
      <>
        <SpaceBetweenDiv withmargin={false}>
          <ColAlignDiv>
            <StyledTitle variant="h5" style={{ margin: '0', padding: '0 64px' }}>
              {state?.name}
            </StyledTitle>
            <StyledTitle className="main-header" variant="caption" style={{ padding: '0 64px' }}>
              {isUpdateCampaignLoading ? renderLoader('20px', 10, 6) : 'Draft auto-saved'}
            </StyledTitle>
            <StyledSubtitle variant="subtitle1" gutterBottom paddingBottom={34}></StyledSubtitle>
          </ColAlignDiv>
        </SpaceBetweenDiv>
      </>
    );
  };

  const TabLabel = ({ children, count }: { children: string; count: number }) => {
    return (
      <StyledBox>
        {currentStep + 1 > count ? (
          <div className="check-icon">
            <CheckCircle />
          </div>
        ) : (
          <CircleDiv isactive={currentStep + 1 === count}>{count}</CircleDiv>
        )}
        <TabLabelTypography isActive={currentStep + 1 === count} isSuccess={currentStep + 1 > count}>
          {children}
        </TabLabelTypography>
      </StyledBox>
    );
  };

  const renderButtons = () => {
    if (currentStep === 0) {
      const isNextDisabled =
        state?.template === CATEGORY_FOCUS_ID ? selectedCategoriesIds?.length !== 1 : selectedProductsIds?.length === 0;
      return (
        <SpaceBetweenDiv withmargin={false} style={{ margin: '0 64px', justifyContent: 'flex-end' }}>
          <StyledCategoryBtn
            data-testid="step-1-next-btn"
            variant="contained"
            disableElevation
            height={40}
            disabled={isNextDisabled}
            onClick={handleUpdateFocus}
          >
            Next
          </StyledCategoryBtn>
        </SpaceBetweenDiv>
      );
    } else if (currentStep === 1) {
      const isNextDisabled = selectedStoresIds?.length === 0;
      return (
        <SpaceBetweenDiv withmargin={false} style={{ margin: '0 64px' }}>
          <StyleOutlinedBtn
            data-testid="step-2-back-btn"
            variant="outlined"
            disableElevation
            height={40}
            onClick={handleBackButton}
          >
            Back
          </StyleOutlinedBtn>
          <StyledCategoryBtn
            data-testid="step-2-next-btn"
            variant="contained"
            disableElevation
            height={40}
            disabled={isNextDisabled}
            onClick={handleUpdateStores}
          >
            Next
          </StyledCategoryBtn>
        </SpaceBetweenDiv>
      );
    } else {
      const isPublishDisabled = requestData?.requiredSubmissions === 0 || requestData?.campaignEndDate === null;
      return (
        <SpaceBetweenDiv withmargin={false} style={{ margin: '0 64px 32px' }}>
          <StyleOutlinedBtn
            data-testid="step-3-back-btn"
            variant="outlined"
            disableElevation
            height={40}
            onClick={handleBackButton}
          >
            Back
          </StyleOutlinedBtn>
          <StyledCategoryBtn
            data-testid="step-3-publish-btn"
            variant="contained"
            disableElevation
            height={40}
            onClick={handlePublishCampaign}
            disabled={isPublishDisabled}
          >
            {isUpdateCampaignLoading && isPublish ? renderLoader('34px', 17, 6) : 'Publish'}
          </StyledCategoryBtn>
        </SpaceBetweenDiv>
      );
    }
  };

  const getTabLabel = () => {
    if (state?.template === CATEGORY_FOCUS_ID) return 'Select category';
    else return 'Select products';
  };

  const renderGridCard = () => (
    <StyledCard
      style={{ margin: '24px 64px 34px' }}
      className="focus-grid-card"
      width="calc(100% - 160px)"
      height="fit-content"
    >
      {currentStep === 0 ? <StepGrid stepType={getStepType()} /> : <StoreGrid />}
    </StyledCard>
  );

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb" sx={{ padding: '0 64px 34px !important' }}>
        <StyledTypography className="link" onClick={handlePrevious} data-testid="products-link">
          Campaigns
        </StyledTypography>
        <StyledTypography color="text.primary">New campaign</StyledTypography>
      </StyledBreadcrumbs>
      {renderHeader()}
      <StyledSteps value={currentStep} onChange={handleTabChange}>
        <Tab
          label={<TabLabel count={1}>{getTabLabel()}</TabLabel>}
          id="tab-0"
          aria-controls="step-0"
          disableRipple
          disabled
        />
        <Tab
          label={<TabLabel count={2}>Select stores</TabLabel>}
          id="tab-1"
          aria-controls="step-1"
          disableRipple
          disabled
        />
        <Tab
          label={<TabLabel count={3}>Review and publish</TabLabel>}
          id="tab-2"
          aria-controls="step-2"
          disableRipple
          disabled
        />
      </StyledSteps>
      {currentStep !== 2 && renderGridCard()}
      {currentStep === 2 && (
        <ReviewCardsInfo
          data={state}
          onStoreCompletionChange={handleUpdateStoreCompletion}
          onStartDateChange={handleUpdateStartDate}
          onEndDateChange={handleUpdateEndDate}
        />
      )}
      {renderButtons()}
    </div>
  );

  return (
    <ContentDetails style={{ backgroundColor: '#f7fafd', height: '100%', zIndex: '-1' }}>
      {renderContent()}
    </ContentDetails>
  );
};

export default NewCampaign;
