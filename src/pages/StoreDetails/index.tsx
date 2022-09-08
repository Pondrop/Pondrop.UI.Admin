import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { IState } from 'pages/types';
import { useGetStoreInfoQuery } from 'store/api/stores/api';
import StoreInfoPanel from './components/StoreInfo';

import {
  CircularLoaderWrapper,
  ContentDetails,
  StyledBreadcrumbs,
  StyledSubtitle,
  StyledTab,
  StyledTabs,
  StyledTitle,
  StyledTypography,
} from '../styles';

const StoreDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();
  const { store_id } = useParams();

  const { data, isFetching } = useGetStoreInfoQuery({ storeId: store_id ?? '' }, { skip: !!location.state });

  const state = location?.state as IState;
  const rowData = state?.rowData ?? data?.value[0];
  const isLoading = state?.rowData ? false : isFetching;

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const renderLoader = () => (
    <CircularLoaderWrapper height="calc(100vh - 36px)">
      <CircularProgress size={100} thickness={3} />
    </CircularLoaderWrapper>
  );

  const handlePrevious = () => navigate(-1);

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handlePrevious} data-testid="stores-link">
          Stores
        </StyledTypography>
        <StyledTypography color="text.primary">{rowData?.['Name']}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" gutterBottom>
        {rowData?.['Name']}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom>
        {`${rowData?.['Street']}, ${rowData?.['City']} ${rowData?.['State']} ${rowData?.['Zip_Code']}`}
      </StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Store information" id="tab-0" aria-controls="store-detail-0" disableRipple />
      </StyledTabs>
      <StoreInfoPanel value={currentTab} index={0} data={rowData} />
    </div>
  );

  return <ContentDetails>{isLoading ? renderLoader() : renderContent()}</ContentDetails>;
};

export default StoreDetails;
