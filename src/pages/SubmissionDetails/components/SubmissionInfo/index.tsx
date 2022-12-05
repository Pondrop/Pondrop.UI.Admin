import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { Info } from '@mui/icons-material';

import { ISubmissionDetailsResponse } from 'store/api/tasks/types';
import { RowAlignWrapper, SpaceBetweenDiv, StyledCard, StyledCardTitle, StyledTabContent } from 'pages/styles';
import { ISubmissionInfoPanelProps } from 'pages/types';
import TaskRow from '../TaskRow';
import { CATEGORY_PRODUCT_ID, submissionTitles, tooltipContent } from './constants';

const SubmissionInfoPanel = ({ value, index, data }: ISubmissionInfoPanelProps): JSX.Element => {
  const [taskInfo, setTaskInfo] = useState<ISubmissionDetailsResponse>({} as ISubmissionDetailsResponse);

  useEffect(() => {
    setTaskInfo(data as ISubmissionDetailsResponse);
  }, [data]);

  const renderSubmissionDetails = () => {
    return submissionTitles.map((row, index) => (
      <SpaceBetweenDiv key={`${taskInfo?.id}-details-${index}`}>
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
    const categoryFocus =
      data?.steps[0]?.fields[0]?.type === 'focus' ? data?.steps[0]?.fields[0]?.values[0]?.itemValue : null;
    return (
      <div>
        {data?.steps.map((step) => (
          <TaskRow stepData={step} key={step.id} categoryFocus={categoryFocus} />
        ))}
      </div>
    );
  };

  const getTooltipContent = () => {
    let tooltipValue = '';
    if (taskInfo?.submissionTemplateId === CATEGORY_PRODUCT_ID) tooltipValue = tooltipContent['manual'];
    else tooltipValue = tooltipContent['not-supplied'];

    return tooltipValue;
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="task-detail-0" aria-labelledby="tab-0">
      <StyledCard width="400px">
        <StyledCardTitle variant="h6" gutterBottom>
          Details
        </StyledCardTitle>
        {renderSubmissionDetails()}
        <RowAlignWrapper></RowAlignWrapper>
      </StyledCard>
      <StyledCard width="900px">
        <StyledCardTitle variant="h6" gutterBottom>
          <RowAlignWrapper>
            Task Data
            <Tooltip title={getTooltipContent()} placement="top">
              <div className="info-icon" style={{ marginLeft: '8px' }}>
                <Info />
              </div>
            </Tooltip>
          </RowAlignWrapper>
        </StyledCardTitle>
        {renderTaskData()}
        <RowAlignWrapper></RowAlignWrapper>
      </StyledCard>
    </StyledTabContent>
  );
};

export default SubmissionInfoPanel;
