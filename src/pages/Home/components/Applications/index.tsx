import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getApplicationsAsync, selectApplications } from 'features/applications/applicationsSlice';
import { ApplicationsWrapper } from './styles';
import { Spinner, Table, Button } from 'components';

const Applications = () => {
  const dispatch = useAppDispatch();
  const { value: applications, status } = useAppSelector(selectApplications);
  const hasApplications = applications.length > 0;

  const handleFetchApplications = (): void => {
    dispatch(getApplicationsAsync());
  };

  return (
    <ApplicationsWrapper>
      <h2 className="applicationTitle">Applications:</h2>
      <div className="content">
        {!hasApplications && status === 'idle' && (
          <span className="guidanceText">Click the button below to fetch the applications table.</span>
        )}
        {status === 'loading' && <Spinner />}
        {hasApplications && status === 'idle' && (
          <Table
            tableData={applications}
            typeOfData={['number', 'string', 'string', 'string', 'string', 'string', 'date']}
            sort={true}
          />
        )}
        <Button
          label={hasApplications ? 'Refetch applications' : 'Fetch applications'}
          color="primary"
          variant="contained"
          onClick={handleFetchApplications}
          disabled={status === 'loading'}
        />
      </div>
    </ApplicationsWrapper>
  );
};

export default Applications;
