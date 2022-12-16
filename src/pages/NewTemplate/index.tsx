import { ChangeEvent, Fragment, FunctionComponent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Info } from '@mui/icons-material';

import { INewTemplateState } from 'pages/types';
import {
  ColAlignDiv,
  ContentDetails,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledBreadcrumbs,
  StyledCard,
  StyledCardTitle,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../styles';
import {
  FIELD_STEP_INSTRUCTION_PLACEHOLDER,
  MANUAL_SUBMISSION_PLACEHOLDER,
  selectedFieldsData,
  templateTitles,
} from './constants';
import { StyledTextInput } from './styles';

const NewTemplate: FunctionComponent = (): JSX.Element => {
  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();

  // States
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalInstructions, setModalInstructions] = useState<string>('');

  // API values
  const state = location?.state as INewTemplateState;

  // Handlers
  const handlePrevious = () => navigate(-1);

  const handleModalTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalTitle(e.target.value);
  };

  const handleModalInstructionsOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalInstructions(e.target.value);
  };

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
            const tempValue = state?.[value?.field as keyof INewTemplateState] ?? '';
            return (
              <Fragment key={value.field}>
                <span className="row-label card-details" style={{ fontSize: '12px', lineHeight: '16px' }}>
                  {value.label}
                </span>
                <span
                  className="row-value singleline card-details"
                  style={{ fontSize: '12px', lineHeight: '16px', marginBottom: '12px' }}
                >
                  {tempValue ? tempValue[0].toUpperCase() + tempValue.slice(1) : ''}
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

  const renderSection2 = () => {
    return (
      <StyledCard
        style={{ margin: '24px 64px 34px' }}
        className="focus-grid-card"
        width="calc(100% - 160px)"
        height="fit-content"
      >
        <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
          <SpaceBetweenDiv withmargin={false}>Step 2: Selected Fields</SpaceBetweenDiv>
        </StyledCardTitle>
        <ColAlignDiv>
          <RowAlignWrapper className="label-div">
            <span style={{ fontWeight: 600, color: '#000000', fontSize: '12px', lineHeight: '16px' }}>
              {selectedFieldsData[0].label}
            </span>
            <div className="info-icon" style={{ marginLeft: '8px' }}>
              <Info />
            </div>
          </RowAlignWrapper>
          <StyledTextInput
            id={`${selectedFieldsData[0].field}-input`}
            margin="none"
            variant="outlined"
            value={modalTitle}
            onChange={handleModalTitleOnChange}
            placeholder={selectedFieldsData[0].placeholder}
            sx={{ marginBottom: '24px' }}
          />
          <RowAlignWrapper className="label-div">
            <span style={{ fontWeight: 600, color: '#000000', fontSize: '12px', lineHeight: '16px' }}>
              {selectedFieldsData[1].label}
            </span>
            <div className="info-icon" style={{ marginLeft: '8px' }}>
              <Info />
            </div>
          </RowAlignWrapper>
          <StyledTextInput
            id={`${selectedFieldsData[1].field}-input`}
            margin="none"
            variant="outlined"
            value={modalInstructions}
            onChange={handleModalInstructionsOnChange}
            placeholder={selectedFieldsData[1].placeholder}
            sx={{ marginBottom: '24px' }}
          />
          <div className="label-div">
            <span className="row-label">Complete fields step instructions</span>
          </div>
          <StyledTextInput
            id="field-step-instruction-textarea"
            margin="none"
            variant="outlined"
            value={''}
            placeholder={FIELD_STEP_INSTRUCTION_PLACEHOLDER}
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
      {renderSection2()}
    </div>
  );

  return (
    <ContentDetails style={{ backgroundColor: '#f7fafd', height: '100%', zIndex: '-1' }}>
      {renderContent()}
    </ContentDetails>
  );
};

export default NewTemplate;
