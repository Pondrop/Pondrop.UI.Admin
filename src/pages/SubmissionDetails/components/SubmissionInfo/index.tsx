import { useEffect, useState } from 'react';

import { ISubmissionDetailsResponse } from 'store/api/tasks/types';
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';
import { ISubmissionInfoPanelProps } from 'pages/types';
import TaskRow from '../TaskRow';
import { submissionTitles } from './constants';

const SubmissionInfoPanel = ({ value, index, data }: ISubmissionInfoPanelProps): JSX.Element => {
  const [taskInfo, setTaskInfo] = useState<ISubmissionDetailsResponse>({} as ISubmissionDetailsResponse);

  useEffect(() => {
    setTaskInfo(data as ISubmissionDetailsResponse);
  }, [data]);

  const renderStoreDetails = () => {
    return submissionTitles.map((row, index) => (
      <SpaceBetweenDiv key={`${taskInfo.id}-details-${index}`}>
        <span className="row-label">{row.label}</span>
        <span className="row-value singleline">
          {taskInfo?.[row.field as keyof ISubmissionDetailsResponse] ?? (
            <i style={{ marginRight: '2px' }}>Not supplied</i>
          )}
        </span>
      </SpaceBetweenDiv>
    ));
  };

  const renderTaskData = () => {
    return (
      <div>
        {data?.steps.map((step) => (
          <TaskRow stepData={step} key={step.id} />
        ))}
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
