import { ChangeEvent, useEffect, useState } from 'react';
import { CircularProgress, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close, Info } from '@mui/icons-material';

import { IValue } from 'store/api/types';
import TextAutocomplete from 'components/Autocomplete';
import Chips from 'components/Chips';
import { StyledChipWrapper } from 'components/Grid/styles';
import { CircularLoaderWrapper, MessageWrapper, RowAlignWrapper, StyledCategoryBtn } from 'pages/styles';
import { addProductTitles } from './constants';
import { StyledDialog, StyledTextInput } from './styles';
import { IAddProductProps } from './types';

const AddProductDialog = ({
  id,
  isOpen,
  handleClose,
  handleSubmit,
  errorMessage,
  isLoading,
  initialValue,
}: IAddProductProps): JSX.Element => {
  const [productName, setProductName] = useState<string>(initialValue?.name ?? '');
  const [barcode, setBarcode] = useState<string>(initialValue?.barcodeNumber ?? '');
  const [description, setDescription] = useState<string>('');
  const [categories, setCategories] = useState<string[]>(initialValue?.categoryIds ?? []);
  const [categoryChips, setCategoryChips] = useState<IValue[]>(initialValue?.categoryChips ?? []);

  useEffect(() => {
    if (isOpen) {
      setProductName(initialValue?.name ?? '');
      setBarcode(initialValue?.barcodeNumber ?? '');
      setCategories(initialValue?.categoryIds ?? []);
      setCategoryChips(initialValue?.categoryChips ?? []);
    }
  }, [isOpen, initialValue]);

  const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleBarcodeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // insert validation here
    setBarcode(e.target.value);
  };

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCategoryOnChange = (option: IValue) => {
    setCategories((oldValue) => [...oldValue, String(option?.lowerLevelCategoryId)]);
    setCategoryChips((oldValue) => [...oldValue, option]);
  };

  const handleModalClose = () => {
    setProductName('');
    setBarcode('');
    setDescription('');
    setCategories([]);
    setCategoryChips([]);
    handleClose();
  };

  const renderCategoriesChips = () => {
    return (
      <StyledChipWrapper>
        {categoryChips.map((val: IValue, index: number) => {
          const handleDeleteChip = () => {
            setCategories((oldValue) => oldValue.filter((value) => value !== val.lowerLevelCategoryId));
            setCategoryChips((oldValue) => oldValue.filter((value) => value.id !== val.id));
          };
          return <Chips key={`${val.id}-${index}`} label={String(val.categoryName)} onChipDelete={handleDeleteChip} />;
        })}
      </StyledChipWrapper>
    );
  };

  const handleModalSubmit = () => {
    handleSubmit({
      name: productName,
      barcodeNumber: barcode,
      shortDescription: description,
      categoryIds: categories,
    });
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
            <span className="row-label">{addProductTitles[0].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${addProductTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            value={productName}
            onChange={handleNameOnChange}
            placeholder={addProductTitles[0].placeholder}
            sx={{ marginBottom: '12px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{addProductTitles[1].label}</span>
          </div>
          <StyledTextInput
            id={`${addProductTitles[1].field}-input`}
            margin="none"
            variant="outlined"
            value={barcode ? Number(barcode) : ''}
            onChange={handleBarcodeOnChange}
            placeholder={addProductTitles[1].placeholder}
            sx={{ marginBottom: '12px' }}
            type="number"
            inputProps={{
              pattern: '[0-9]*',
            }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{addProductTitles[2].label}</span>
          </div>
          <StyledTextInput
            id={`${addProductTitles[2].field}-input`}
            margin="none"
            variant="outlined"
            value={description}
            onChange={handleDescriptionOnChange}
            placeholder={addProductTitles[2].placeholder}
            multiline
            rows={5}
            sx={{ marginBottom: '24px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{addProductTitles[3].label}</span>
          </div>
          <TextAutocomplete onOptionSelect={handleCategoryOnChange} isModalOpen={isOpen} disabledOptions={categories} />
        </div>
        {categories.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <div className="label-div">
              <span className="row-label">{addProductTitles[4].label}</span>
            </div>
            {renderCategoriesChips()}
          </div>
        )}
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
          disabled={productName === '' || isLoading}
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
      data-testid={id}
      id={id}
      keepMounted
    >
      {renderDialogTitle()}
      <DialogContent className="dialog-content">{renderFields()}</DialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default AddProductDialog;
