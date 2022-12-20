import { useEffect, useState } from 'react';
import { CircularProgress, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

// Components
import TextAutocomplete from 'components/Autocomplete';
import Chips from 'components/Chips';
import { StyledChipWrapper } from 'components/Grid/styles';

import { IValue } from 'store/api/types';
import { CircularLoaderWrapper, MessageWrapper, RowAlignWrapper, StyledCategoryBtn, StyledDialog } from 'pages/styles';
import { IUpdateProductProps } from './types';

const UpdateCategoriesDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  isLoading,
  isFetchingData = false,
  categories,
  categoryChips,
}: IUpdateProductProps): JSX.Element => {
  const [currCategories, setCurrCategories] = useState<string[]>(categories);
  const [currCategoryChips, setCurrCategoryChips] = useState<IValue[]>(categoryChips);

  useEffect(() => {
    if (!isOpen) {
      setCurrCategories(categories);
      setCurrCategoryChips(categoryChips);
    }
  }, [isOpen]);

  useEffect(() => {
    setCurrCategories(categories);
  }, [categories]);

  useEffect(() => {
    setCurrCategoryChips(categoryChips);
  }, [categoryChips]);

  const handleCategoryOnChange = (option: IValue) => {
    setCurrCategories((oldValue) => [...oldValue, String(option?.lowerLevelCategoryId)]);

    const categFormat = {
      id: option.lowerLevelCategoryId,
      name: option.categoryName,
      type: 'category',
    };
    setCurrCategoryChips((oldValue) => [...oldValue, categFormat]);
  };

  const handleModalClose = () => {
    setCurrCategories(categories);
    setCurrCategoryChips(categoryChips);
    handleClose();
  };

  const handleModalSubmit = () => {
    handleSubmit(currCategories);
  };

  const renderCategoriesChips = () => {
    return (
      <StyledChipWrapper>
        {currCategoryChips.map((val: IValue, index: number) => {
          const handleDeleteChip = () => {
            setCurrCategories((oldValue) => oldValue.filter((value) => value !== val.id));
            setCurrCategoryChips((oldValue) => oldValue.filter((value) => value.id !== val.id));
          };
          return <Chips key={`${val.id}-${index}`} label={String(val.name)} onChipDelete={handleDeleteChip} />;
        })}
      </StyledChipWrapper>
    );
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
          <TextAutocomplete
            onOptionSelect={handleCategoryOnChange}
            isModalOpen={isOpen}
            disabledOptions={currCategories}
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <div className="label-div">
            <span className="row-label">Categories</span>
          </div>
          {currCategoryChips.length > 0 && renderCategoriesChips()}
        </div>
        {currCategories.length === 0 && (
          <MessageWrapper color="red" style={{ margin: '12px 0 4px', lineHeight: '20px' }} withMargin={false}>
            A product must be linked to a category. Add a new category to continue.
          </MessageWrapper>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (isFetchingData) return renderLoader(50);
    else return renderFields();
  };

  const renderDialogTitle = () => {
    return (
      <DialogTitle className="dialog-title" sx={{ m: 0, p: 2 }}>
        Edit Categories
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
          data-testid="update-category-product-btn"
          className="update-category-product-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
          disabled={currCategories.length === 0}
        >
          {isLoading ? renderLoader(34) : 'Done'}
        </StyledCategoryBtn>
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
      data-testid="update-category-product-modal"
      keepMounted
      dialogWidth={520}
    >
      {renderDialogTitle()}
      <DialogContent className="dialog-content">{renderContent()}</DialogContent>
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default UpdateCategoriesDialog;
