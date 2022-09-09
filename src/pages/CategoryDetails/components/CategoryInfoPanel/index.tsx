import { useEffect, useState } from 'react';

import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';
import { ITabPanelProps } from 'pages/types';
import { IValue } from 'store/api/types';
import { activityValues, categoryTitles } from './constants';
import LinkedProducts from '../LinkedProducts';

const ProductInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [categoryInfo, setCategoryInfo] = useState<IValue>({});

  useEffect(() => {
    setCategoryInfo(data ?? {});
  }, [data]);

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
          {renderDetails()}
        </StyledCard>
        <StyledCard width="309px" height="160px">
          <StyledCardTitle variant="h6" gutterBottom>
            Activity
          </StyledCardTitle>
          {renderActivity()}
        </StyledCard>
      </RowAlignWrapper>
      <StyledCard className="grid-card" width="calc(100% - 96px)" height="fit-content">
        <LinkedProducts />
      </StyledCard>
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
