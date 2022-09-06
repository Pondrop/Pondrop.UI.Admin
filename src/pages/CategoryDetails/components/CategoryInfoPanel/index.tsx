import { ChangeEvent, useEffect, useState } from 'react';

import {
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCard,
  StyledCardTitle,
  StyledTabContent,
  StyledTextInput,
} from 'pages/styles';
import { ICategoryTabProps } from 'pages/types';
import { IValue } from 'store/api/types';
import { activityValues, categoryTitles } from './constants';
import LinkedProducts from '../LinkedProducts';

const ProductInfoPanel = ({ value, index, data, isCreate, requestRef }: ICategoryTabProps): JSX.Element => {
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryInfo, setCategoryInfo] = useState<IValue>({});

  useEffect(() => {
    setCategoryInfo(data ?? {});
  }, [data]);

  // Handlers
  const handleCategoryOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    if (requestRef)
      requestRef.current = {
        ...requestRef.current,
        categoryName: e.target.value,
      };
  };

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    if (requestRef)
      requestRef.current = {
        ...requestRef.current,
        description: e.target.value,
      };
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

  const renderDetails = () => {
    return (
      <div>
        <SpaceBetweenDiv key={`${categoryInfo.Id}-details-0`}>
          <span className="row-label">{categoryTitles[0].label}</span>
          <span className="row-value singleline">{categoryInfo?.Category}</span>
        </SpaceBetweenDiv>
        <SpaceBetweenDiv key={`${categoryInfo.Id}-details-1`}>
          <span className="row-label">{categoryTitles[1].label}</span>
          <span className="row-value multiline">{categoryInfo?.Description}</span>
        </SpaceBetweenDiv>
      </div>
    );
  };

  const renderActivity = () => {
    return activityValues.map((activity, index) => (
      <SpaceBetweenDiv key={`${categoryInfo.Id}-activity-${index}`}>
        <span className="row-label">{activity.label}</span>
        <span className="row-value singleline">{activity.value}</span>
      </SpaceBetweenDiv>
    ));
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="category-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper>
        <StyledCard width="450px" height="160px">
          <StyledCardTitle variant="h6" gutterBottom>
            Details
          </StyledCardTitle>
          {isCreate ? renderCreateCategory() : renderDetails()}
        </StyledCard>
        {!isCreate && (
          <StyledCard width="309px" height="160px">
            <StyledCardTitle variant="h6" gutterBottom>
              Activity
            </StyledCardTitle>
            {renderActivity()}
          </StyledCard>
        )}
      </RowAlignWrapper>
      {!isCreate && (
        <StyledCard className="grid-card" width="calc(100% - 96px)" height="fit-content">
          <LinkedProducts />
        </StyledCard>
      )}
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
