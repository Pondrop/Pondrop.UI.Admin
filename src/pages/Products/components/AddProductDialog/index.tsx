import { ChangeEvent, useState } from 'react';
import { CircularProgress, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close, Info } from '@mui/icons-material';

import { useGetCategoriesQuery } from 'store/api/categories/api';
import TextAutocomplete from 'components/Autocomplete';
import { CircularLoaderWrapper, MessageWrapper, RowAlignWrapper, StyledCategoryBtn } from 'pages/styles';
import { productTitles } from './constants';
import { StyledDialog, StyledTextInput } from './styles';
import { IAddProductProps } from './types';

const AddProductDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  errorMessage,
  isLoading,
}: IAddProductProps): JSX.Element => {
  const [productName, setProductName] = useState<string>('');
  const [barcode, setBarcode] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [categorySearch, setCategorySearch] = useState<string>('');

  const { data, isFetching } = useGetCategoriesQuery({
    searchString: categorySearch,
  });

  const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleBarcodeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // insert validation here
    setBarcode(Number(e.target.value));
  };

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSearchOnChange = (searchValue: string) => {
    setCategorySearch(searchValue);
  };

  const handleModalClose = () => {
    setProductName('');
    setBarcode(undefined);
    setDescription('');
    handleClose();
  };

  const handleModalSubmit = () => {
    //handleSubmit({ name: categoryName, higherLevelCategoryId: parentCategory });
  };

  const renderLoader = (height: number) => (
    <CircularLoaderWrapper height={`${height}px`}>
      <CircularProgress size={height / 2} thickness={6} />
    </CircularLoaderWrapper>
  );

  const renderFields = () => {
    return (
      <div>
        <div>
          <div className="label-div">
            <span className="row-label">{productTitles[0].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${productTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            value={productName}
            onChange={handleNameOnChange}
            placeholder={productTitles[0].placeholder}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{productTitles[1].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${productTitles[1].field}-input`}
            margin="none"
            variant="outlined"
            value={barcode}
            onChange={handleBarcodeOnChange}
            placeholder={productTitles[1].placeholder}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{productTitles[2].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${productTitles[2].field}-input`}
            margin="none"
            variant="outlined"
            value={description}
            onChange={handleDescriptionOnChange}
            placeholder={productTitles[2].placeholder}
            multiline
            rows={5}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{productTitles[3].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <TextAutocomplete />
        </div>
      </div>
    );
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        Add Product
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
          data-testid="add-product-btn"
          className="add-product-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
          disabled={productName === ''}
        >
          {isLoading ? renderLoader(34) : 'Create'}
        </StyledCategoryBtn>
        {/* {errorMessage !== '' && !isLoading && (
          <MessageWrapper color="red">
            <div className="info-icon" style={{ margin: '0 4px 0 8px' }}>
              <Info />
            </div>
            {errorMessage}
          </MessageWrapper>
        )} */}
      </RowAlignWrapper>
    );
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      transitionDuration={300}
      data-testid="add-category-modal"
      keepMounted
    >
      {renderDialogTitle()}
      <DialogContent className="dialog-content">{renderFields()}</DialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default AddProductDialog;
