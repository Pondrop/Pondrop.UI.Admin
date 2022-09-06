import { useEffect, useState } from 'react';

import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';
import { ITabPanelProps } from 'pages/types';
import { IValue } from 'store/api/types';
import { activityValues, productTitles } from './constants';

const ProductInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [productInfo, setProductInfo] = useState<IValue>({});

  useEffect(() => {
    setProductInfo(data ?? {});
  }, [data]);

  const renderStoreDetails = () => {
    return productTitles.map((row, index) => (
      <SpaceBetweenDiv key={`${productInfo.Id}-details-${index}`}>
        <span className="row-label">{row.label}</span>
        <span className="row-value singleline">{productInfo?.[row.field]}</span>
      </SpaceBetweenDiv>
    ));
  };

  const renderActivity = () => {
    return activityValues.map((activity, index) => (
      <SpaceBetweenDiv key={`${productInfo.Id}-activity-${index}`}>
        <span className="row-label">{activity.label}</span>
        <span className="row-value singleline">{activity.value}</span>
      </SpaceBetweenDiv>
    ));
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="product-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper>
        <StyledCard width="470px" height="260px">
          <StyledCardTitle variant="h6" gutterBottom>
            Details
          </StyledCardTitle>
          {renderStoreDetails()}
        </StyledCard>
        <StyledCard width="309px" height="260px">
          <StyledCardTitle variant="h6" gutterBottom>
            Activity
          </StyledCardTitle>
          {renderActivity()}
        </StyledCard>
      </RowAlignWrapper>
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
