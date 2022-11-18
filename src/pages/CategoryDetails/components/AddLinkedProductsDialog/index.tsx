import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Close, Info } from '@mui/icons-material';

import { CircularLoaderWrapper, MessageWrapper, RowAlignWrapper, StyledCategoryBtn } from 'pages/styles';
import { useGetParentCategoriesQuery } from 'store/api/categories/api';
import { categoryTitles } from './constants';
import { StyledDialog, StyledInputBase, StyledMenuItem, StyledSelect, StyledTextInput } from './styles';
import { IAddLinkedProductsProps } from './types';

const AddLinkedProductsDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  errorMessage,
  isLoading,
}: IAddLinkedProductsProps): JSX.Element => {
  const selectComponent = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState<DOMRect>({} as DOMRect);
  const [categoryName, setCategoryName] = useState<string>('');
  const [parentCategory, setParentCategory] = useState<string>('');
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const { data, isFetching } = useGetParentCategoriesQuery();

  useEffect(() => {
    setPosition(selectComponent?.current ? selectComponent?.current?.getBoundingClientRect() : ({} as DOMRect));
    if (!isOpen) {
      setCategoryName('');
      setParentCategory('');
    }
  }, [isOpen]);

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleCategoryOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleDescriptionOnChange = (event: SelectChangeEvent<unknown>) => {
    setParentCategory(String(event.target.value));
  };

  const handleModalClose = () => {
    setCategoryName('');
    setParentCategory('');
    handleClose();
  };

  const handleModalSubmit = () => {
    //handleSubmit({ name: categoryName, higherLevelCategoryId: parentCategory });
    handleModalClose();
  };

  const renderLoader = (height: number) => (
    <CircularLoaderWrapper height={`${height}px`}>
      <CircularProgress size={height / 2} thickness={6} />
    </CircularLoaderWrapper>
  );

  const renderStates = () => {
    if (isFetching) {
      return (
        <MenuItem disabled sx={{ display: 'flex', justifyContent: 'center' }}>
          {renderLoader(100)}
        </MenuItem>
      );
    } else {
      return (
        <MenuItem>
          <i style={{ color: '#72787e', fontSize: '12px' }}>No Parent Categories found.</i>
        </MenuItem>
      );
    }
  };

  const renderCreateCategory = () => {
    return (
      <div>
        <div>
          <div className="label-div">
            <span className="row-label">{categoryTitles[0].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${categoryTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            value={categoryName}
            onChange={handleCategoryOnChange}
            placeholder={categoryTitles[0].placeholder}
            sx={{ marginBottom: '24px' }}
          />
        </div>
        <div>
          <div className="label-div">
            <span className="row-label">{categoryTitles[1].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledSelect
            ref={selectComponent}
            id={`${categoryTitles[1].field}-input`}
            className="select-component"
            value={parentCategory}
            onChange={handleDescriptionOnChange}
            renderValue={
              parentCategory !== ''
                ? undefined
                : () => <div className="placeholder">{categoryTitles[1].placeholder}</div>
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  top: `${position.top + 48}px !important`,
                  left: `${position.left}px !important`,
                  width: `${position.width - 2}px !important`,
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
            onClose={handleSelectClose}
            onOpen={handleSelectOpen}
            isOpen={isSelectOpen}
            displayEmpty
          >
            {isFetching || data?.value?.length === 0
              ? renderStates()
              : data?.value.map((category) => (
                  <StyledMenuItem key={String(category.id)} value={String(category.id)}>
                    {category.name}
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
        Add products to category
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
          data-testid="add-category-btn"
          className="add-category-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={handleModalSubmit}
          disabled={categoryName === '' || parentCategory === '' || isLoading}
        >
          {isLoading ? renderLoader(34) : 'Done'}
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
      onClose={handleModalClose}
      maxWidth="xl"
      fullWidth={true}
      transitionDuration={300}
      data-testid="add-linked-products-modal"
      keepMounted
    >
      {renderDialogTitle()}
      {/* <DialogContent className="dialog-content">{renderCreateCategory()}</DialogContent> */}
      <DialogActions className="dialog-actions">{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default AddLinkedProductsDialog;
