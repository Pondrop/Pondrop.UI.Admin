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
import { useAppDispatch, useAppSelector } from 'store';
import { selectCategories, setCategoryFields } from 'store/api/categories/slice';
import { IValue } from 'store/api/types';
import { activityValues, categoryTitles } from './constants';
import LinkedProducts from '../LinkedProducts';

const ProductInfoPanel = ({ value, index, data, isCreate }: ICategoryTabProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { categoryField } = useAppSelector(selectCategories);

  const [categoryInfo, setCategoryInfo] = useState<IValue>({});

  useEffect(() => {
    setCategoryInfo(data ?? {});
  }, [data]);

  // Handlers
  const handleCategoryOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setCategoryFields({
        ...categoryField,
        categoryName: e.target.value,
      }),
    );
  };

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setCategoryFields({
        ...categoryField,
        description: e.target.value,
      }),
    );
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
            value={categoryField.categoryName}
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
            value={categoryField.description}
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
