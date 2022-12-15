import { Fragment, FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
import { MANUAL_SUBMISSION_PLACEHOLDER, templateTitles } from './constants';
import { StyledTextInput } from './styles';

const NewTemplate: FunctionComponent = (): JSX.Element => {
  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();

  // API values
  const state = location?.state as INewTemplateState;

  // Handlers
  const handlePrevious = () => navigate(-1);

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
            const tempValue = state[value?.field as keyof INewTemplateState];
            return (
              <Fragment key={value.field}>
                <span className="row-label card-details" style={{ fontSize: '12px', lineHeight: '16px' }}>
                  {value.label}
                </span>
                <span
                  className="row-value singleline card-details"
                  style={{ fontSize: '12px', lineHeight: '16px', marginBottom: '12px' }}
                >
                  {tempValue[0].toUpperCase() + tempValue.slice(1)}
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
