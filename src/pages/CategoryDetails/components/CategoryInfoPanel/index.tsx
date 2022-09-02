import { ChangeEvent, useState } from 'react';
import {
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCard,
  StyledCardTitle,
  StyledTabContent,
  StyledTextInput,
} from 'pages/styles';
import { ITabPanelProps } from 'pages/types';
import { categoryTitles } from './constants';

const ProductInfoPanel = ({ value, index, data, isCreate }: ITabPanelProps): JSX.Element => {
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Handlers
  const handleCategoryOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const renderCreateCategory = () => {
    return (
      <div>
        <SpaceBetweenDiv key={`create-category-${categoryTitles[0].field}`}>
          <span className="row-label">{categoryTitles[0].label}</span>
          <StyledTextInput
            id={`${categoryTitles[0].field}-input`}
            margin="none"
            variant="outlined"
            size="small"
            value={category}
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

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="category-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper>
        <StyledCard width={502} height={155}>
          <StyledCardTitle variant="h6" gutterBottom>
            Details
          </StyledCardTitle>
          {renderCreateCategory()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
      </RowAlignWrapper>
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
