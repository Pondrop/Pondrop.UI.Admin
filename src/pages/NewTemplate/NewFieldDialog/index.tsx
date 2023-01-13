import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DialogActions, DialogContent, DialogTitle, IconButton, SelectChangeEvent } from '@mui/material';
import { Close } from '@mui/icons-material';

// Constants
import { fieldTypeData, newFieldTitles, templateFocusObjectData, templateTypeData } from './constants';

// Styles
import {
  SpaceBetweenDiv,
  StyledCategoryBtn,
  StyledDialogWSelect,
  StyledInputBase,
  StyledMenuItem,
  StyleOutlinedBtn,
  StyledSelect,
  StyledTextInput,
} from 'pages/styles';

// Types
import { INewFieldProps } from './types';

// Utils
import { renderLoader } from 'pages/utils';

const NewFieldDialog = ({ isOpen, handleClose }: INewFieldProps): JSX.Element => {
  // Select component position variables
  const selectTemplateComponent = useRef<HTMLInputElement>(null);
  const [templatePosition, setTemplatePosition] = useState<DOMRect>({} as DOMRect);
  const selectFieldTypeComponent = useRef<HTMLInputElement>(null);
  const [fieldTypePosition, setFieldTypePosition] = useState<DOMRect>({} as DOMRect);
  const selectFocusComponent = useRef<HTMLInputElement>(null);
  const [focusPosition, setFocusPosition] = useState<DOMRect>({} as DOMRect);

  // States
  const [templateType, setTemplateType] = useState<string>('');
  const [fieldLabel, setFieldLabel] = useState<string>('');
  const [fieldType, setFieldType] = useState<string>('');
  const [focusObject, setFocusObject] = useState<string>('');
  const [maxIntegerValue, setMaxIntegerValue] = useState<string>('');
  const [pickerListValue, setPickerListValue] = useState<string>('');
  const [isSelectTemplateOpen, setIsSelectTemplateOpen] = useState<boolean>(false);
  const [isSelectFieldTypeOpen, setIsSelectFieldTypeOpen] = useState<boolean>(false);
  const [isSelectFocusOpen, setIsSelectFocusOpen] = useState<boolean>(false);

  // Setting of select dropdown position
  useEffect(() => {
    setTemplatePosition(
      selectTemplateComponent?.current ? selectTemplateComponent?.current?.getBoundingClientRect() : ({} as DOMRect),
    );
    setFieldTypePosition(
      selectFieldTypeComponent?.current ? selectFieldTypeComponent?.current?.getBoundingClientRect() : ({} as DOMRect),
    );
    setFocusPosition(
      selectFocusComponent?.current ? selectFocusComponent?.current?.getBoundingClientRect() : ({} as DOMRect),
    );

    if (!isOpen) {
      setTemplateType('');
      setFieldLabel('');
      setFieldType('');
      setFocusObject('');
      setMaxIntegerValue('');
      setPickerListValue('');
    }
  }, [isOpen]);

  const handleSelectTemplateTypeClose = () => {
    setIsSelectTemplateOpen(false);
  };

  const handleSelectTemplateTypeOpen = () => {
    setIsSelectTemplateOpen(true);
  };

  const handleSelectFieldTypeClose = () => {
    setIsSelectFieldTypeOpen(false);
  };

  const handleSelectFieldTypeOpen = () => {
    setIsSelectFieldTypeOpen(true);
  };

  const handleSelectFocusClose = () => {
    setIsSelectFocusOpen(false);
  };

  const handleSelectFocusOpen = () => {
    setIsSelectFocusOpen(true);
  };

  const handleTemplateTypeOnChange = (event: SelectChangeEvent<unknown>) => {
    setTemplateType(String(event.target.value));
  };

  const handleFieldLabelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldLabel(e.target.value);
  };

  const handleFieldTypeOnChange = (event: SelectChangeEvent<unknown>) => {
    setFieldType(String(event.target.value));
  };

  const handleFocusOnChange = (event: SelectChangeEvent<unknown>) => {
    setFocusObject(String(event.target.value));
  };

  const handleMaxValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxIntegerValue(e.target.value);
  };

  const handlePickerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPickerListValue(e.target.value);
  };

  const handleModalClose = () => {
    handleClose();
  };

  const handleModalSubmit = () => {
    handleModalClose();
    // handleSubmit({
    //   title: templateTitle,
    //   type: TEMPLATE_TYPE[templateType as keyof typeof TEMPLATE_TYPE],
    //   initiatedBy: TEMPLATE_INITIATED_BY[templateInitiatedBy as keyof typeof TEMPLATE_INITIATED_BY],
    //   description: templateDescription,
    //   focus: FOCUS_TYPE[templateFocusObject as keyof typeof FOCUS_TYPE],
    // });
  };

  const renderCreateTemplateField = () => {
    return (
      <div>
        <div>
          <div className="label-div">
            <span className="row-label">{newFieldTitles[0].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={selectTemplateComponent}
            id={`${newFieldTitles[0].field}-input`}
            className="select-template-type-component"
            value={templateType}
            onChange={handleTemplateTypeOnChange}
            renderValue={
              templateType !== '' ? undefined : () => <div className="placeholder">{newFieldTitles[0].placeholder}</div>
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  top: `${templatePosition.top + 48}px !important`,
                  left: `${templatePosition.left}px !important`,
                  width: `${templatePosition.width - 2}px !important`,
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
            onClose={handleSelectTemplateTypeClose}
            onOpen={handleSelectTemplateTypeOpen}
            isOpen={isSelectTemplateOpen}
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
            <span className="row-label">{newFieldTitles[1].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${newFieldTitles[1].field}-input`}
            margin="none"
            variant="outlined"
            value={fieldLabel}
            onChange={handleFieldLabelOnChange}
            placeholder={newFieldTitles[1].placeholder}
            sx={{ marginBottom: '24px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{newFieldTitles[2].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={selectFieldTypeComponent}
            id={`${newFieldTitles[2].field}-input`}
            className="select-field-type-component"
            value={fieldType}
            onChange={handleFieldTypeOnChange}
            renderValue={
              fieldType !== '' ? undefined : () => <div className="placeholder">{newFieldTitles[2].placeholder}</div>
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  top: `${fieldTypePosition.top + 48}px !important`,
                  left: `${fieldTypePosition.left}px !important`,
                  width: `${fieldTypePosition.width - 2}px !important`,
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
            onClose={handleSelectFieldTypeClose}
            onOpen={handleSelectFieldTypeOpen}
            isOpen={isSelectFieldTypeOpen}
            sx={{ marginBottom: '24px' }}
            displayEmpty
          >
            {fieldTypeData.map((field) => (
              <StyledMenuItem key={String(field.id)} value={String(field.id)}>
                {field.label}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{newFieldTitles[3].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={selectFocusComponent}
            id={`${newFieldTitles[3].field}-input`}
            className="select-field-type-component"
            value={focusObject}
            onChange={handleFocusOnChange}
            renderValue={
              focusObject !== '' ? undefined : () => <div className="placeholder">{newFieldTitles[3].placeholder}</div>
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
            sx={{ marginBottom: '24px' }}
            displayEmpty
            disabled={fieldType !== 'search' && fieldType !== 'focus'}
          >
            {templateFocusObjectData.map((focus) => (
              <StyledMenuItem key={String(focus.id)} value={String(focus.id)}>
                {focus.label}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{newFieldTitles[4].label}</span>
          </div>
          <StyledTextInput
            id={`${newFieldTitles[4].field}-input`}
            margin="none"
            variant="outlined"
            value={maxIntegerValue}
            onChange={handleMaxValueOnChange}
            placeholder={newFieldTitles[4].placeholder}
            sx={{ marginBottom: '24px' }}
            disabled={
              fieldType !== 'integer' && fieldType !== 'multilineText' && fieldType !== 'search' && fieldType !== 'text'
            }
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{newFieldTitles[5].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${newFieldTitles[5].field}-input`}
            margin="none"
            variant="outlined"
            value={pickerListValue}
            onChange={handlePickerOnChange}
            placeholder={newFieldTitles[5].placeholder}
            disabled={fieldType !== 'picker'}
          />
        </div>
      </div>
    );
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        Create new template field
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
      <SpaceBetweenDiv withmargin={false} style={{ width: '100%' }}>
        <StyleOutlinedBtn
          data-testid="select-template-done-btn"
          className="button-with-icon"
          variant="outlined"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
        >
          Cancel
        </StyleOutlinedBtn>
        <StyledCategoryBtn
          data-testid="select-template-new-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalClose}
        >
          Create
        </StyledCategoryBtn>
      </SpaceBetweenDiv>
    );
  };

  return (
    <StyledDialogWSelect
      open={isOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth={true}
      transitionDuration={300}
      data-testid="new-template-modal"
      keepMounted
      dialogWidth={560}
    >
      {renderDialogTitle()}
      <DialogContent className="dialog-content">{renderCreateTemplateField()}</DialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialogWSelect>
  );
};

export default NewFieldDialog;
