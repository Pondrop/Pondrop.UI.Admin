import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { EditOutlined, Info } from '@mui/icons-material';

// Constants
import { activityValues } from './constants';

// Styles
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';

// Types
import { IFullProductInfo } from 'store/api/products/types';
import { IProductDetailTabProps } from '../types';

const ActivityInfoPanel = ({ value, index, data }: IProductDetailTabProps): JSX.Element => {
  const [activityInfo, setActivityInfo] = useState<IFullProductInfo>({} as IFullProductInfo);

  useEffect(() => {
    setActivityInfo(data ?? ({} as IFullProductInfo));
  }, [data]);

  const renderActivityDetails = () => {
    return activityValues.map((row, index) => (
      <SpaceBetweenDiv key={index}>
        <span className="row-label">{row.label}</span>
        <span className="row-value singleline">{row.value}</span>
      </SpaceBetweenDiv>
    ));
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="product-detail-1" aria-labelledby="tab-1">
      <RowAlignWrapper>
        <StyledCard width="370px">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Activity
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
              </RowAlignWrapper>
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderActivityDetails()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
      </RowAlignWrapper>
    </StyledTabContent>
  );
};

export default ActivityInfoPanel;
