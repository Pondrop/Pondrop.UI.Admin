import { ChangeEvent, useEffect, useState } from 'react';
import { DialogActions, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

// Constants
import { storeTitles } from '../StoreInfo/constants';

// Styles
import { SpaceBetweenDiv, StyledCategoryBtn, StyledDialog, StyledTextInput, StyleOutlinedBtn } from 'pages/styles';
import { StyledDialogContent } from './styles';

// Types
import { IAddProductProps } from './types';

// Utils
import { renderLoader } from 'pages/utils';

const EditStoreDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  isLoading,
  initialValue,
}: IAddProductProps): JSX.Element => {
  const [storeName, setStoreName] = useState<string>(initialValue?.name ?? '');
  const [storeAddress, setStoreAddress] = useState<string>(initialValue?.addressLine1 ?? '');
  const [city, setCity] = useState<string>(initialValue?.suburb ?? '');
  const [state, setState] = useState<string>(initialValue?.state ?? '');
  const [postCode, setPostCode] = useState<string>(initialValue?.postcode ?? '');
  const [geolocation, setGeolocation] = useState<string>(initialValue?.location ?? '');

  useEffect(() => {
    if (isOpen) {
      // After dialog is opened, values are reset / given their initial values
      setStoreName(initialValue?.name ?? '');
      setStoreAddress(initialValue?.addressLine1 ?? '');
      setCity(initialValue?.suburb ?? '');
      setState(initialValue?.state ?? '');
      setPostCode(initialValue?.postcode ?? '');
      setGeolocation(initialValue?.location ?? '');
    }
  }, [isOpen, initialValue]);

  const handleStoreNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value);
  };

  const handleStoreAddressOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreAddress(e.target.value);
  };

  const handleCityOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleStateOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handlePostCodeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostCode(e.target.value);
  };

  const handleGeolocationOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGeolocation(e.target.value);
  };

  const handleModalClose = () => {
    handleClose();
  };

  const handleModalSubmit = () => {
    handleModalClose();
    // handleSubmit({
    //   name: productName,
    //   barcodeNumber: barcode,
    //   shortDescription: description,
    //   categoryIds: categories,
    // });
  };

  const renderFields = () => {
    return (
      <div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[0].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            value={initialValue?.isCommunityStore ? 'Yes' : 'No'}
            placeholder={storeTitles[0].label}
            sx={{ marginBottom: '12px' }}
            disabled={true}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[1].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[1].field}-input`}
            margin="none"
            variant="outlined"
            value={initialValue?.retailer?.name}
            placeholder={storeTitles[1].label}
            sx={{ marginBottom: '12px' }}
            disabled={true}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[2].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[2].field}-input`}
            margin="none"
            variant="outlined"
            value={storeName}
            onChange={handleStoreNameOnChange}
            placeholder={storeTitles[2].label}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[3].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[3].field}-input`}
            margin="none"
            variant="outlined"
            value={storeAddress}
            onChange={handleStoreAddressOnChange}
            placeholder={storeTitles[3].label}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[4].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[4].field}-input`}
            margin="none"
            variant="outlined"
            value={city}
            onChange={handleCityOnChange}
            placeholder={storeTitles[4].label}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[5].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[5].field}-input`}
            margin="none"
            variant="outlined"
            value={state}
            onChange={handleStateOnChange}
            placeholder={storeTitles[5].label}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[6].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[6].field}-input`}
            margin="none"
            variant="outlined"
            value={postCode}
            onChange={handlePostCodeOnChange}
            placeholder={storeTitles[6].label}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{storeTitles[7].label}</span>
          </div>
          <StyledTextInput
            id={`${storeTitles[7].field}-input`}
            margin="none"
            variant="outlined"
            value={geolocation}
            onChange={handleGeolocationOnChange}
            placeholder={storeTitles[7].label}
            sx={{ marginBottom: '12px' }}
          />
        </div>
      </div>
    );
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        Edit store details
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
          data-testid="edit-store-cancel-btn"
          variant="outlined"
          disableElevation
          height={40}
          onClick={handleModalClose}
        >
          Cancel
        </StyleOutlinedBtn>
        <StyledCategoryBtn
          data-testid="new-template-create-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
          disabled={isLoading}
        >
          {isLoading ? renderLoader('34px', 17, 6) : 'Save'}
        </StyledCategoryBtn>
      </SpaceBetweenDiv>
    );
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth={true}
      transitionDuration={300}
      keepMounted
      dialogWidth={560}
    >
      {renderDialogTitle()}
      <StyledDialogContent className="dialog-content">{renderFields()}</StyledDialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default EditStoreDialog;
