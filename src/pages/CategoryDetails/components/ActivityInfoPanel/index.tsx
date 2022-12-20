import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { EditOutlined, Info } from '@mui/icons-material';

// Constants
import { activityValues } from './constants';

// Styles
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';

// Types
import { IValue } from 'store/api/types';
import { ITabPanelProps } from 'pages/types';

const ActivityInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [activityInfo, setActivityInfo] = useState<IValue>({});

  useEffect(() => {
    setActivityInfo(data ?? {});
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
    <StyledTabContent role="tabpanel" hidden={value !== index} id="category-detail-1" aria-labelledby="tab-1">
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
