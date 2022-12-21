import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

// Components
import SubmissionInfoPanel from './components/SubmissionInfo';

// Store / APIs
import { useGetSubmissionInfoQuery } from 'store/api/tasks/api';

// Styles
import {
  ContentDetails,
  StyledBreadcrumbs,
  StyledSubtitle,
  StyledTab,
  StyledTabs,
  StyledTitle,
  StyledTypography,
} from '../styles';

// Utils
import { renderLoader } from 'pages/utils';

const SubmissionDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  // React router dom values
  const navigate = useNavigate();
  const { submission_id } = useParams();

  const { data, isFetching } = useGetSubmissionInfoQuery({ submissionId: submission_id ?? '' });

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handlePrevious = () => navigate(-1);

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handlePrevious} data-testid="submissions-link">
          Submitted tasks
        </StyledTypography>
        <StyledTypography color="text.primary">{data?.templateTitle}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" gutterBottom>
        {data?.templateTitle}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom>
        Submitted {moment(data?.submittedUtc).format('hh:mm:ss a Do MMMM YYYY')}
      </StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Task information" id="tab-0" aria-controls="task-detail-0" disableRipple />
      </StyledTabs>
      <SubmissionInfoPanel value={currentTab} index={0} data={data} />
    </div>
  );

  return <ContentDetails>{isFetching ? renderLoader('calc(100vh - 36px)', 100, 3) : renderContent()}</ContentDetails>;
};

export default SubmissionDetails;
