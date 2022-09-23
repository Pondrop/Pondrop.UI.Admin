import { useEffect, useState } from 'react';

import { IValue } from 'store/api/types';
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';
import { ITabPanelProps } from 'pages/types';
import { storeTitles } from './constants';

const SubmissionInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [storeInfo, setStoreInfo] = useState<IValue>({});

  useEffect(() => {
    setStoreInfo(data ?? {});
  }, [data]);

  const renderStoreDetails = () => {
    return storeTitles.map((row, index) => (
      <SpaceBetweenDiv key={`${storeInfo.Id}-details-${index}`}>
        <span className="row-label">{row.label}</span>
        <span className="row-value singleline">{storeInfo?.[row.field]}</span>
      </SpaceBetweenDiv>
    ));
  };

  const renderTaskData = () => {
    return <></>;
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="store-detail-0" aria-labelledby="tab-0">
      <StyledCard width="470px">
        <StyledCardTitle variant="h6" gutterBottom>
          Details
        </StyledCardTitle>
        {renderStoreDetails()}
        <RowAlignWrapper></RowAlignWrapper>
      </StyledCard>
      <StyledCard width="800px" height="300px">
        <StyledCardTitle variant="h6" gutterBottom>
          Task Data
        </StyledCardTitle>
        {renderTaskData()}
        <RowAlignWrapper></RowAlignWrapper>
      </StyledCard>
    </StyledTabContent>
  );
};

export default SubmissionInfoPanel;
