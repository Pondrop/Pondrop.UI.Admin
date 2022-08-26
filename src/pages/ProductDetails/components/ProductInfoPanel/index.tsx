import { useEffect, useState } from 'react';

import { IValue } from 'store/api/types';
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';
import { ITabPanelProps } from 'pages/types';
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
        <span className="row-value">{productInfo?.[row.field]}</span>
      </SpaceBetweenDiv>
    ));
  };

  const renderActivity = () => {
    return activityValues.map((activity, index) => (
      <SpaceBetweenDiv key={`${productInfo.Id}-activity-${index}`}>
        <span className="row-label">{activity.label}</span>
        <span className="row-value">{activity.value}</span>
      </SpaceBetweenDiv>
    ));
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="product-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper>
        <StyledCard width={502}>
          <StyledCardTitle variant="h6" gutterBottom>
            Details
          </StyledCardTitle>
          {renderStoreDetails()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
        <StyledCard width={341}>
          <StyledCardTitle variant="h6" gutterBottom>
            Activity
          </StyledCardTitle>
          {renderActivity()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
      </RowAlignWrapper>
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
