import { Fragment, FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { CircularLoaderWrapper } from 'pages/styles';
import { INewTemplateState } from 'pages/types';
import {
  ColAlignDiv,
  ContentDetails,
  SpaceBetweenDiv,
  StyledBreadcrumbs,
  StyledCard,
  StyledCardTitle,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../styles';
import { FocusObjectLabels, MANUAL_SUBMISSION_PLACEHOLDER, templateTitles, TypeLabels } from './constants';
import { StyledTextInput } from './styles';

const NewTemplate: FunctionComponent = (): JSX.Element => {
  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();

  // API values
  const state = location?.state as INewTemplateState;

  // Handlers
  const handlePrevious = () => navigate(-1);

  const renderLoader = (height: number) => (
    <CircularLoaderWrapper height={`${height}px`}>
      <CircularProgress size={height / 2} thickness={6} />
    </CircularLoaderWrapper>
  );

  const renderHeader = () => {
    return (
      <>
        <SpaceBetweenDiv withmargin={false}>
          <ColAlignDiv>
            <StyledTitle variant="h5" style={{ margin: '0', padding: '0 64px' }}>
              {state?.title}
            </StyledTitle>
            <StyledTitle className="main-header" variant="caption" style={{ padding: '0 64px' }}>
              Draft auto-saved
            </StyledTitle>
            <StyledSubtitle variant="subtitle1" gutterBottom paddingBottom={10}></StyledSubtitle>
          </ColAlignDiv>
        </SpaceBetweenDiv>
      </>
    );
  };

  const renderSection1 = () => {
    return (
      <StyledCard
        style={{ margin: '24px 64px 34px' }}
        className="focus-grid-card"
        width="calc(100% - 160px)"
        height="fit-content"
      >
        <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
          <SpaceBetweenDiv withmargin={false}>Template</SpaceBetweenDiv>
        </StyledCardTitle>
        <ColAlignDiv>
          {templateTitles.map((value) => {
            let tempValue;
            if (value.field === 'type') tempValue = TypeLabels[state?.type as keyof typeof TypeLabels];
            else if (value.field === 'focusObject')
              tempValue = FocusObjectLabels[state?.focusObject as keyof typeof FocusObjectLabels];
            else tempValue = state[value?.field as keyof INewTemplateState];
            return (
              <Fragment key={value.field}>
                <span className="row-label card-details" style={{ fontSize: '12px', lineHeight: '16px' }}>
                  {value.label}
                </span>
                <span
                  className="row-value singleline card-details"
                  style={{ fontSize: '12px', lineHeight: '16px', marginBottom: '12px' }}
                >
                  {tempValue}
                </span>
              </Fragment>
            );
          })}
          <StyledTextInput
            id="manual-submission-textarea"
            margin="none"
            variant="outlined"
            value={''}
            placeholder={MANUAL_SUBMISSION_PLACEHOLDER}
            multiline
            rows={5}
            disabled
          />
        </ColAlignDiv>
      </StyledCard>
    );
  };

  // const renderButtons = () => {
  //   const isPublishDisabled = requestData?.requiredSubmissions === 0 || requestData?.campaignEndDate === null;
  //   return (
  //     <SpaceBetweenDiv withmargin={false} style={{ margin: '0 64px 32px' }}>
  //       <StyleOutlinedBtn
  //         data-testid="step-3-back-btn"
  //         variant="outlined"
  //         disableElevation
  //         height={40}
  //         onClick={handleBackButton}
  //       >
  //         Back
  //       </StyleOutlinedBtn>
  //       <StyledCategoryBtn
  //         data-testid="step-3-publish-btn"
  //         variant="contained"
  //         disableElevation
  //         height={40}
  //         onClick={handlePublishCampaign}
  //         disabled={isPublishDisabled}
  //       >
  //         {isUpdateCampaignLoading && isPublish ? renderLoader(34) : 'Publish'}
  //       </StyledCategoryBtn>
  //     </SpaceBetweenDiv>
  //   );
  // };

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb" sx={{ padding: '0 64px 34px !important' }}>
        <StyledTypography className="link" onClick={handlePrevious} data-testid="products-link">
          Templates
        </StyledTypography>
        <StyledTypography color="text.primary">New template</StyledTypography>
      </StyledBreadcrumbs>
      {renderHeader()}
      {renderSection1()}
    </div>
  );

  return (
    <ContentDetails style={{ backgroundColor: '#f7fafd', height: '100%', zIndex: '-1' }}>
      {renderContent()}
    </ContentDetails>
  );
};

export default NewTemplate;
