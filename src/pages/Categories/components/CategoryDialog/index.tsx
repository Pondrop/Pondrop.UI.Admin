import { ChangeEvent, useState } from 'react';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { SpaceBetweenDiv, StyledCategoryBtn, StyledTextInput } from 'pages/styles';
import { categoryTitles } from './constants';
import { StyledDialog } from './styles';
import { ICreateCategoryProps } from './types';

const CategoryDialog = ({ isOpen, handleClose, handleSubmit }: ICreateCategoryProps): JSX.Element => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleCategoryOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleModalClose = () => {
    setCategoryName('');
    setDescription('');
    handleClose();
  };

  const handleModalSubmit = () => {
    handleSubmit({ categoryName, description });
    setCategoryName('');
    setDescription('');
    handleClose();
  };

  const renderCreateCategory = () => {
    return (
      <div>
        <SpaceBetweenDiv key={`create-category-${categoryTitles[0].field}`}>
          <div>
            <span className="row-label">{categoryTitles[0].label}</span>
            <span className="req-icon"> *</span>
          </div>
          <StyledTextInput
            id={`${categoryTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            size="small"
            value={categoryName}
            onChange={handleCategoryOnChange}
            className="create-components"
          />
        </SpaceBetweenDiv>
        <SpaceBetweenDiv key={`create-category-${categoryTitles[1].field}`}>
          <span className="row-label">{categoryTitles[1].label}</span>
          <StyledTextInput
            id={`${categoryTitles[1].field}-input`}
            margin="none"
            variant="outlined"
            size="small"
            value={description}
            onChange={handleDescriptionOnChange}
            multiline
            rows={4}
            className="create-components"
          />
        </SpaceBetweenDiv>
      </div>
    );
  };

  const renderActionButtons = () => {
    return (
      <div>
        <StyledCategoryBtn
          sx={{ marginRight: '20px' }}
          data-testid="cancel-btn"
          className="cancel-btn"
          disableElevation
          onClick={handleModalClose}
          height={40}
        >
          Cancel
        </StyledCategoryBtn>
        <StyledCategoryBtn
          data-testid="add-category-btn"
          className="add-category-btn"
          variant="contained"
          disableElevation
          onClick={handleModalSubmit}
          height={40}
          disabled={!categoryName}
        >
          Create
        </StyledCategoryBtn>
      </div>
    );
  };

  return (
    <StyledDialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth={true} transitionDuration={300}>
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>{renderCreateCategory()}</DialogContent>
      <DialogActions>{renderActionButtons()}</DialogActions>
    </StyledDialog>
  );
};

export default CategoryDialog;
