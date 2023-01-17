import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

// Constants
import { storeTitles } from './constants';

// Styles
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';

// Types
import { IValue } from 'store/api/types';
import { ITabPanelProps } from 'pages/types';

const StoreInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [storeInfo, setStoreInfo] = useState<IValue>({});

  useEffect(() => {
    setStoreInfo(data ?? {});
  }, [data]);

  const renderStoreDetails = () => {
    return storeTitles.map((row, index) => {
      if (index === 0) {
        return (
          <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
            <span className="row-label">{row.label}</span>
            <span className="row-value singleline">{storeInfo?.isCommunityStore ? 'Yes' : 'No'}</span>
          </SpaceBetweenDiv>
        );
      } else if (index === 1) {
        const retailer = storeInfo?.retailer as unknown as IValue;
        return (
          <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
            <span className="row-label">{row.label}</span>
            <span className="row-value singleline">{retailer?.name}</span>
          </SpaceBetweenDiv>
        );
      } else if (index === storeTitles.length - 1) {
        return (
          <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
            <span className="row-label">{row.label}</span>
            <span className="row-value singleline">{`${storeInfo?.latitude}, ${storeInfo?.longitude}`}</span>
          </SpaceBetweenDiv>
        );
      }
      return (
        <SpaceBetweenDiv key={`${storeInfo.id}-details-${index}`}>
          <span className="row-label">{row.label}</span>
          <span className="row-value singleline">{storeInfo?.[row.field]}</span>
        </SpaceBetweenDiv>
      );
    });
  };

  const renderOpeningHours = () => {
    const storeHoursArray = String(storeInfo?.openHours).split(' | ');

    return storeHoursArray.map((row, index) => {
      const labelValue = row.split(':- ')[0];
      const hoursValue = row.split(':- ')[1];
      return (
        <SpaceBetweenDiv key={`${storeInfo.Id}-hours-${index}`}>
          <span className="row-label capitalize">{labelValue}</span>
          <span className="row-value singleline">{hoursValue}</span>
        </SpaceBetweenDiv>
      );
    });
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="store-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper>
        <StyledCard width="470px">
          <StyledCardTitle variant="h6" gutterBottom>
            <SpaceBetweenDiv withmargin={false}>
              Details
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderStoreDetails()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
        <StyledCard width="350px">
          <StyledCardTitle variant="h6" gutterBottom>
            Opening Hours
          </StyledCardTitle>
          {renderOpeningHours()}
          <RowAlignWrapper></RowAlignWrapper>
        </StyledCard>
      </RowAlignWrapper>
    </StyledTabContent>
  );
};

export default StoreInfoPanel;
