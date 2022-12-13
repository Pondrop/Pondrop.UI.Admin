import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { Close, Info } from '@mui/icons-material';

import { CircularLoaderWrapper, MessageWrapper, RowAlignWrapper, StyledCategoryBtn } from 'pages/styles';
import { newTemplateTitles, templateFocusObjectData, templateTypeData } from './constants';
import { StyledDialog, StyledInputBase, StyledMenuItem, StyledSelect, StyledTextInput } from './styles';
import { ICreateCategoryProps } from './types';

const NewTemplateDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  errorMessage,
  isLoading,
}: ICreateCategoryProps): JSX.Element => {
  // Select component position variables
  const selectTypeComponent = useRef<HTMLInputElement>(null);
  const [typePosition, setTypePosition] = useState<DOMRect>({} as DOMRect);
  const selectFocusComponent = useRef<HTMLInputElement>(null);
  const [focusPosition, setFocusPosition] = useState<DOMRect>({} as DOMRect);

  // States
  const [templateTitle, setTemplateTitle] = useState<string>('');
  const [templateType, setTemplateType] = useState<string>('');
  const [templateDescription, setTemplateDescription] = useState<string>('');
  const [templateFocusObject, setTemplateFocusObject] = useState<string>('');
  const [isSelectTypeOpen, setIsSelectTypeOpen] = useState<boolean>(false);
  const [isSelectFocusOpen, setIsSelectFocusOpen] = useState<boolean>(false);

  // Setting of select dropdown position
  useEffect(() => {
    setTypePosition(
      selectTypeComponent?.current ? selectTypeComponent?.current?.getBoundingClientRect() : ({} as DOMRect),
    );
    setFocusPosition(
      selectFocusComponent?.current ? selectFocusComponent?.current?.getBoundingClientRect() : ({} as DOMRect),
    );
  }, [isOpen]);

  const handleSelectTypeClose = () => {
    setIsSelectTypeOpen(false);
  };

  const handleSelectTypeOpen = () => {
    setIsSelectTypeOpen(true);
  };

  const handleSelectFocusClose = () => {
    setIsSelectFocusOpen(false);
  };

  const handleSelectFocusOpen = () => {
    setIsSelectFocusOpen(true);
  };

  const handleTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplateTitle(e.target.value);
  };

  const handleTypeOnChange = (event: SelectChangeEvent<unknown>) => {
    setTemplateType(String(event.target.value));
  };

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplateDescription(e.target.value);
  };

  const handleFocusOnChange = (event: SelectChangeEvent<unknown>) => {
    setTemplateFocusObject(String(event.target.value));
  };

  const handleModalClose = () => {
    setTemplateTitle('');
    setTemplateType('');
    setTemplateDescription('');
    setTemplateFocusObject('');
    handleClose();
  };

  const handleModalSubmit = () => {
    handleSubmit({
      title: templateTitle,
      type: templateType,
      description: templateDescription,
      focusObject: templateFocusObject,
    });
  };

  const renderLoader = (height: number) => (
    <CircularLoaderWrapper height={`${height}px`}>
      <CircularProgress size={height / 2} thickness={6} />
    </CircularLoaderWrapper>
  );

  const renderCreateCategory = () => {
    return (
      <div>
        <div>
          <div className="label-div">
            <span className="row-label">{newTemplateTitles[0].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${newTemplateTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            value={templateTitle}
            onChange={handleTitleOnChange}
            placeholder={newTemplateTitles[0].placeholder}
            sx={{ marginBottom: '24px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{newTemplateTitles[1].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={selectTypeComponent}
            id={`${newTemplateTitles[1].field}-input`}
            className="select-type-component"
            value={templateType}
            onChange={handleTypeOnChange}
            renderValue={
              templateType !== ''
                ? undefined
                : () => <div className="placeholder">{newTemplateTitles[1].placeholder}</div>
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  top: `${typePosition.top + 48}px !important`,
                  left: `${typePosition.left}px !important`,
                  width: `${typePosition.width - 2}px !important`,
                  border: '1px solid #006492 !important',
                  borderRadius: '0 0 8px 8px !important',
                  maxHeight: '144px !important',
                  '::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '::-webkit-scrollbar-thumb': {
                    height: '6px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  },
                },
              },
            }}
            input={<StyledInputBase />}
            onClose={handleSelectTypeClose}
            onOpen={handleSelectTypeOpen}
            isOpen={isSelectTypeOpen}
            sx={{ marginBottom: '24px' }}
            displayEmpty
          >
            {templateTypeData.map((templateType) => (
              <StyledMenuItem key={String(templateType.id)} value={String(templateType.id)}>
                {templateType.label}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{newTemplateTitles[2].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${newTemplateTitles[2].field}-input`}
            margin="none"
            variant="outlined"
            value={templateDescription}
            onChange={handleDescriptionOnChange}
            placeholder={newTemplateTitles[2].placeholder}
            sx={{ marginBottom: '24px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{newTemplateTitles[3].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={selectFocusComponent}
            id={`${newTemplateTitles[3].field}-input`}
            className="select-focus-component"
            value={templateFocusObject}
            onChange={handleFocusOnChange}
            renderValue={
              templateFocusObject !== ''
                ? undefined
                : () => <div className="placeholder">{newTemplateTitles[3].placeholder}</div>
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  top: `${focusPosition.top + 48}px !important`,
                  left: `${focusPosition.left}px !important`,
                  width: `${focusPosition.width - 2}px !important`,
                  border: '1px solid #006492 !important',
                  borderRadius: '0 0 8px 8px !important',
                  maxHeight: '144px !important',
                  '::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '::-webkit-scrollbar-thumb': {
                    height: '6px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  },
                },
              },
            }}
            input={<StyledInputBase />}
            onClose={handleSelectFocusClose}
            onOpen={handleSelectFocusOpen}
            isOpen={isSelectFocusOpen}
            displayEmpty
          >
            {templateFocusObjectData.map((focusObject) => (
              <StyledMenuItem key={String(focusObject.id)} value={String(focusObject.id)}>
                {focusObject.label}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </div>
      </div>
    );
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        New template
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            right: 32,
            top: 32,
            color: '#1c1b1f',
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
    );
  };

  const renderActionButtons = () => {
    return (
      <RowAlignWrapper>
        <StyledCategoryBtn
          data-testid="new-template-btn"
          className="new-template-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
          disabled={
            templateTitle === '' ||
            templateType === '' ||
            templateDescription === '' ||
            templateFocusObject === '' ||
            isLoading
          }
        >
          {isLoading ? renderLoader(34) : 'Create'}
        </StyledCategoryBtn>
        {errorMessage !== '' && !isLoading && (
          <MessageWrapper color="red">
            <div className="info-icon" style={{ margin: '0 4px 0 8px' }}>
              <Info />
            </div>
            {errorMessage}
          </MessageWrapper>
        )}
      </RowAlignWrapper>
    );
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth={true}
      transitionDuration={300}
      data-testid="new-template-modal"
      keepMounted
    >
      {renderDialogTitle()}
      <DialogContent className="dialog-content">{renderCreateCategory()}</DialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default NewTemplateDialog;
