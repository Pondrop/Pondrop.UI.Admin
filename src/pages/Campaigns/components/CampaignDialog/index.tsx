import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, SelectChangeEvent } from '@mui/material';
import { Close } from '@mui/icons-material';

// Constants
import { campaignTitles, campaignTypeData } from './constants';

// Store / APIs
import { IValue } from 'store/api/types';
import { useGetSubmissionTemplatesQuery } from 'store/api/tasks/api';

// Styles
import {
  RowAlignWrapper,
  StyledCategoryBtn,
  StyledDialogWSelect,
  StyledInputBase,
  StyledMenuItem,
  StyledSelect,
  StyledTextInput,
} from 'pages/styles';

// Types
import { INewCampaignProps } from './types';

// Utils
import { renderLoader } from 'pages/utils';

const CampaignDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  isCreateCampaignLoading,
}: INewCampaignProps): JSX.Element => {
  // Refs and select component positions
  const typeSelectComponent = useRef<HTMLInputElement>(null);
  const templateSelectComponent = useRef<HTMLInputElement>(null);
  const [typePosition, setTypePosition] = useState<DOMRect>({} as DOMRect);
  const [templatePosition, setTemplatePosition] = useState<DOMRect>({} as DOMRect);

  // Field values
  const [campaignTitle, setCampaignTitle] = useState<string>('');
  const [campaignType, setCampaignType] = useState<string>('');
  const [template, setTemplate] = useState<string>('');
  const [templateOptions, setTemplateOptions] = useState<IValue[]>([]);

  // Select component open state
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState<boolean>(false);
  const [isTemplateSelectOpen, setIsTemplateSelectOpen] = useState<boolean>(false);

  const { data, isFetching } = useGetSubmissionTemplatesQuery();

  useEffect(() => {
    setTypePosition(
      typeSelectComponent?.current ? typeSelectComponent?.current?.getBoundingClientRect() : ({} as DOMRect),
    );
    setTemplatePosition(
      templateSelectComponent?.current ? templateSelectComponent?.current?.getBoundingClientRect() : ({} as DOMRect),
    );
    if (!isOpen) {
      setCampaignTitle('');
      setCampaignType('');
      setTemplate('');
    }
  }, [isOpen]);

  useEffect(() => {
    // Only active templates and those initiated by shopper can be accessible in the campaign dialog
    const activeTemplates = data?.items?.filter(
      (template) => template.status === 'active' && template.initiatedBy === 'shopper',
    );

    setTemplateOptions(activeTemplates ?? []);
  }, [data]);

  const handleTypeSelectClose = () => {
    setIsTypeSelectOpen(false);
  };

  const handleTypeSelectOpen = () => {
    setIsTypeSelectOpen(true);
    setIsTemplateSelectOpen(false);
  };

  const handleTemplateSelectClose = () => {
    setIsTemplateSelectOpen(false);
  };

  const handleTemplateSelectOpen = () => {
    setIsTemplateSelectOpen(true);
    setIsTypeSelectOpen(false);
  };

  const handleTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignTitle(e.target.value);
  };

  const handleTypeOnChange = (event: SelectChangeEvent<unknown>) => {
    setCampaignType(String(event.target.value));
  };

  const handleTemplateOnChange = (event: SelectChangeEvent<unknown>) => {
    setTemplate(String(event.target.value));
  };

  const handleModalClose = () => {
    handleClose();
  };

  const handleModalSubmit = () => {
    handleSubmit({
      name: campaignTitle,
      campaignType,
      selectedTemplateIds: [template],
    });
  };

  // Shows loading state while data is fetching
  const renderStates = () => {
    if (isFetching) {
      return (
        <MenuItem disabled sx={{ display: 'flex', justifyContent: 'center' }}>
          {renderLoader('100px', 50, 6)}
        </MenuItem>
      );
    } else {
      return (
        <MenuItem>
          <i style={{ color: '#72787e', fontSize: '12px' }}>No templates found.</i>
        </MenuItem>
      );
    }
  };

  const renderFields = () => {
    return (
      <div>
        <div>
          <div className="label-div">
            <span className="row-label">{campaignTitles[0].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${campaignTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            value={campaignTitle}
            onChange={handleTitleOnChange}
            placeholder={campaignTitles[0].placeholder}
            sx={{ marginBottom: '24px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{campaignTitles[1].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={typeSelectComponent}
            id={`${campaignTitles[1].field}-input`}
            className="type-select-component"
            value={campaignType}
            onChange={handleTypeOnChange}
            renderValue={
              campaignType !== '' ? undefined : () => <div className="placeholder">{campaignTitles[1].placeholder}</div>
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
            onClose={handleTypeSelectClose}
            onOpen={handleTypeSelectOpen}
            isOpen={isTypeSelectOpen}
            sx={{ marginBottom: '24px' }}
            displayEmpty
          >
            {campaignTypeData.map((category) => (
              <StyledMenuItem key={String(category.id)} value={String(category.id)}>
                {category.name}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{campaignTitles[2].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={templateSelectComponent}
            id={`${campaignTitles[2].field}-input`}
            className="template-select-component"
            value={template}
            onChange={handleTemplateOnChange}
            renderValue={
              template !== '' ? undefined : () => <div className="placeholder">{campaignTitles[2].placeholder}</div>
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
            onClose={handleTemplateSelectClose}
            onOpen={handleTemplateSelectOpen}
            isOpen={isTemplateSelectOpen}
            displayEmpty
          >
            {isFetching || data?.items?.length === 0
              ? renderStates()
              : templateOptions.map((template) => (
                  <StyledMenuItem key={String(template.id)} value={String(template.id)}>
                    {template.title}
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
        New campaign
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
          data-testid="new-campaign-btn"
          className="new-campaign-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
          disabled={campaignTitle === '' || campaignType === '' || template === '' || isCreateCampaignLoading}
        >
          {isCreateCampaignLoading ? renderLoader('34px', 17, 6) : 'Next'}
        </StyledCategoryBtn>
      </RowAlignWrapper>
    );
  };

  return (
    <StyledDialogWSelect
      open={isOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth={true}
      transitionDuration={300}
      data-testid="new-campaign-modal"
      keepMounted
      dialogWidth={560}
    >
      {renderDialogTitle()}
      <DialogContent className="dialog-content">{renderFields()}</DialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialogWSelect>
  );
};

export default CampaignDialog;
