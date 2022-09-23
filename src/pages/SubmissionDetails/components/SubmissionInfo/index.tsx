import { useEffect, useState } from 'react';

import { IValue } from 'store/api/types';
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';
import { ITabPanelProps } from 'pages/types';
import TaskRow from '../TaskRow';
import { submissionTitles, taskData } from './constants';

const SubmissionInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [taskInfo, setTaskInfo] = useState<IValue>({});

  useEffect(() => {
    setTaskInfo(data ?? {});
  }, [data]);

  const renderStoreDetails = () => {
    return submissionTitles.map((row, index) => (
      <SpaceBetweenDiv key={`${taskInfo.Id}-details-${index}`}>
        <span className="row-label">{row.label}</span>
        <span className="row-value singleline">
          {taskInfo?.[row.field] ?? <i style={{ marginRight: '2px' }}>Not supplied</i>}
        </span>
      </SpaceBetweenDiv>
    ));
  };

  const renderTaskData = () => {
    return (
      <div>
        <TaskRow url={taskData[0].url} rowData={taskData[0].data} />
        <TaskRow url={taskData[1].url} rowData={taskData[1].data} />
      </div>
    );
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="store-detail-0" aria-labelledby="tab-0">
      <StyledCard width="400px">
        <StyledCardTitle variant="h6" gutterBottom>
          Details
        </StyledCardTitle>
        {renderStoreDetails()}
        <RowAlignWrapper></RowAlignWrapper>
      </StyledCard>
      <StyledCard width="600px">
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
