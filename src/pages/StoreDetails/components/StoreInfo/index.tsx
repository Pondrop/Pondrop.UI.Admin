import { useEffect, useState } from 'react';

import { IValue } from 'store/api/types';
import { storeTitles } from './constants';
import { RowAlignDetails, RowAlignWrapper, StyledCard, StyledCardTitle, StyledTabContent } from './styles';
import { ITabPanelProps } from './types';

const StoreInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [storeInfo, setStoreInfo] = useState<IValue>({});

  useEffect(() => {
    setStoreInfo(data ?? {});
  }, [data]);

  const renderStoreDetails = () => {
    return storeTitles.map((row, index) => (
      <RowAlignDetails key={`${storeInfo.Id}-details-${index}`}>
        <span className="row-label">{row.label}</span>
        <span className="row-value">{storeInfo?.[row.field]}</span>
      </RowAlignDetails>
    ));
  };

  const renderOpeningHours = () => {
    const storeHoursArray = String(storeInfo?.OpenHours).split(' | ');

    return storeHoursArray.map((row, index) => {
      const labelValue = row.split(':- ')[0];
      const hoursValue = row.split(':- ')[1];
      return (
        <RowAlignDetails key={`${storeInfo.Id}-hours-${index}`}>
          <span className="row-label capitalize">{labelValue}</span>
          <span className="row-value">{hoursValue}</span>
        </RowAlignDetails>
      );
    });
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="detail-0" aria-labelledby="tab-0">
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
