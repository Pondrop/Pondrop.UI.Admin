import { ChangeEvent, Fragment, FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Info } from '@mui/icons-material';

// Components
import Grid from 'components/Grid';
import SelectTemplateDialog from './SelectTemplateDialog';

// Constants
import { selectedFieldsColumns } from 'components/Grid/constants';
import {
  commentsStep,
  FIELD_STEP_INSTRUCTION_PLACEHOLDER,
  MANUAL_SUBMISSION_PLACEHOLDER,
  selectedFieldsData,
  SUMMARY_SUBMIT_INSTRUCTION_PLACEHOLDER,
  templateTitles,
} from './constants';

// Store / APIs
import { useAppSelector } from 'store';
import { useAddTemplateStepMutation, useUpdateTemplateMutation } from 'store/api/tasks/api';
import { addTemplateStepInitialState } from 'store/api/tasks/initialState';
import { selectTemplates } from 'store/api/templates/slice';

// Styles
import {
  ColAlignDiv,
  ContentDetails,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledBreadcrumbs,
  StyledCard,
  StyledCardTitle,
  StyledCategoryBtn,
  StyleOutlinedBtn,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../styles';
import { StyledBtnWrapper, StyledTextInput } from './styles';

// Types
import { IAddTemplateStep } from 'store/api/tasks/types';
import { INewTemplateState } from 'pages/types';

// Utils
import { renderLoader } from 'pages/utils';

const NewTemplate: FunctionComponent = (): JSX.Element => {
  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();

  // States
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalInstructions, setModalInstructions] = useState<string>('');
  const [requestData, setRequestData] = useState<IAddTemplateStep>(addTemplateStepInitialState);
  const [isSelectTemplateOpen, setIsSelectTemplateOpen] = useState<boolean>(false);

  const [isAddingFields, setIsAddingFields] = useState<boolean>(false);
  const [isAddingComments, setIsAddingComments] = useState<boolean>(false);
  const [isActivateTemplate, setIsActivateTemplate] = useState<boolean>(false);

  const { selectedFields } = useAppSelector(selectTemplates);

  // API values
  const state = location?.state as INewTemplateState;

  // API calls
  const [
    addTemplateStep,
    { isSuccess: isAddTemplateStepSuccess, reset: resetAddTemplateStep, isLoading: isAddTemplateStepLoading },
  ] = useAddTemplateStepMutation({ fixedCacheKey: 'new-template-step-mutation' });

  const [updateTemplate, { isSuccess: isUpdateTemplateSuccess, isLoading: isUpdateTemplateLoading }] =
    useUpdateTemplateMutation({ fixedCacheKey: 'update-template-mutation' });

  // Handlers
  const handlePrevious = () => navigate(-1);

  const handleModalTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalTitle(e.target.value);
  };

  const handleModalInstructionsOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalInstructions(e.target.value);
  };

  const handleSaveDraftExit = () => {
    if (modalTitle === '' && modalInstructions === '' && selectedFields.length === 0) navigate(-1);
    else {
      const fieldSteps = selectedFields.map((field) => {
        return {
          id: field?.id as string,
          label: field?.label as string,
          mandatory: field?.mandatory as boolean,
          maxValue: field?.maxValue as number,
        };
      });
      const requestBody = {
        ...requestData,
        isSummary: false,
        title: modalTitle,
        instructions: modalInstructions,
        fieldDefinitions: fieldSteps,
      };
      addTemplateStep(requestBody);
      setIsAddingFields(true);
    }
  };

  const handleActivateTemplate = () => {
    const fieldSteps = selectedFields.map((field) => {
      return {
        id: field?.id as string,
        label: field?.label as string,
        mandatory: field?.mandatory as boolean,
        maxValue: field?.maxValue as number,
      };
    });
    const requestBody = {
      ...requestData,
      isSummary: false,
      title: modalTitle,
      instructions: modalInstructions,
      fieldDefinitions: fieldSteps,
    };
    addTemplateStep(requestBody);
    setIsAddingFields(true);
    setIsActivateTemplate(true);
  };

  const handleSelectTemplateOpen = () => {
    setIsSelectTemplateOpen(true);
  };

  const handleSelectTemplateClose = () => {
    setIsSelectTemplateOpen(false);
  };

  useEffect(() => {
    setRequestData((oldValue) => ({
      ...oldValue,
      submissionId: state?.id,
    }));
  }, []);

  useEffect(() => {
    if (isAddTemplateStepSuccess && !isAddTemplateStepLoading) {
      if (isAddingFields && !isAddingComments) {
        const commentsRequestBody = {
          ...requestData,
          ...commentsStep,
        };
        addTemplateStep(commentsRequestBody);
        setIsAddingComments(true);
        setIsAddingFields(false);
      } else if (isAddingComments && !isAddingFields) {
        setIsAddingComments(false);
        // insert setting active here
        if (isActivateTemplate) {
          updateTemplate({
            ...state,
            iconFontFamily: 'MaterialIcons',
            status: 'active',
            isForManualSubmissions: state?.initiatedBy === 'shopper' ? true : false,
          });
        } else navigate(-1);
        resetAddTemplateStep();
      }
    }
  }, [isAddTemplateStepSuccess, isAddTemplateStepLoading]);

  useEffect(() => {
    if (isUpdateTemplateSuccess && !isUpdateTemplateLoading) {
      setIsActivateTemplate(false);
      navigate(-1);
    }
  }, [isUpdateTemplateSuccess, isUpdateTemplateLoading]);

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
      <StyledCard style={{ margin: '24px 64px 34px' }} width="calc(100% - 160px)" height="fit-content">
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
      <StyledCard style={{ margin: '24px 64px 34px' }} width="calc(100% - 160px)" height="fit-content">
        <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
          <SpaceBetweenDiv withmargin={false}>Step 2: Selected Fields</SpaceBetweenDiv>
        </StyledCardTitle>
        <ColAlignDiv>
          <RowAlignWrapper className="label-div" style={{ alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, color: '#000000', fontSize: '12px', lineHeight: '16px' }}>
              {selectedFieldsData[0].label}
            </span>
            <div className="info-icon" style={{ display: 'flex', marginLeft: '8px' }}>
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
          <RowAlignWrapper className="label-div" style={{ alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, color: '#000000', fontSize: '12px', lineHeight: '16px' }}>
              {selectedFieldsData[1].label}
            </span>
            <div className="info-icon" style={{ display: 'flex', marginLeft: '8px' }}>
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
          <div style={{ marginBottom: '12px' }}>
            <Grid
              data={selectedFields}
              columns={selectedFieldsColumns}
              id="current-selected-fields-grid"
              dataIdKey="id"
              isFetching={false}
              withPadding={false}
              withBorder={false}
              hideFooter={true}
            />
          </div>
          <StyledBtnWrapper>
            <StyledCategoryBtn
              data-testid="add-fields-btn"
              className="add-fields-btn"
              variant="contained"
              disableElevation
              height={40}
              onClick={handleSelectTemplateOpen}
            >
              + Additional fields
            </StyledCategoryBtn>
          </StyledBtnWrapper>
          <SelectTemplateDialog isOpen={isSelectTemplateOpen} handleClose={handleSelectTemplateClose} />
          <div className="label-div" style={{ alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, color: '#000000', fontSize: '12px', lineHeight: '16px' }}>
              Field step instructions
            </span>
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

  const renderSection3 = () => {
    return (
      <StyledCard style={{ margin: '24px 64px 34px' }} width="calc(100% - 160px)" height="fit-content">
        <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
          <SpaceBetweenDiv withmargin={false}>Step 3: Summary & Comments</SpaceBetweenDiv>
        </StyledCardTitle>
        <div className="label-div" style={{ alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontWeight: 600, color: '#000000', fontSize: '12px', lineHeight: '16px' }}>
            Complete summary & submit step instructions
          </span>
        </div>
        <StyledTextInput
          id="summary-submit-textarea"
          margin="none"
          variant="outlined"
          value={''}
          placeholder={SUMMARY_SUBMIT_INSTRUCTION_PLACEHOLDER}
          multiline
          rows={5}
          disabled
        />
      </StyledCard>
    );
  };

  const renderButtons = () => {
    return (
      <RowAlignWrapper style={{ margin: '0 64px 32px', justifyContent: 'end' }}>
        <StyleOutlinedBtn
          data-testid="step-3-back-btn"
          variant="outlined"
          disableElevation
          height={40}
          onClick={handleSaveDraftExit}
          disabled={isAddTemplateStepLoading && !isActivateTemplate}
        >
          {isAddTemplateStepLoading && !isActivateTemplate ? renderLoader('34px', 17, 6) : 'Save draft & exit'}
        </StyleOutlinedBtn>
        <div style={{ marginLeft: '20px' }}>
          <StyledCategoryBtn
            data-testid="step-3-publish-btn"
            variant="contained"
            disableElevation
            height={40}
            disabled={
              selectedFields.length === 0 || isUpdateTemplateLoading || (isAddTemplateStepLoading && isActivateTemplate)
            }
            onClick={handleActivateTemplate}
          >
            {isActivateTemplate ? renderLoader('34px', 17, 6) : 'Activate'}
          </StyledCategoryBtn>
        </div>
      </RowAlignWrapper>
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
      {renderSection3()}
      {renderButtons()}
    </div>
  );

  return (
    <ContentDetails style={{ backgroundColor: '#f7fafd', height: '100%', zIndex: '-1' }}>
      {renderContent()}
    </ContentDetails>
  );
};

export default NewTemplate;
