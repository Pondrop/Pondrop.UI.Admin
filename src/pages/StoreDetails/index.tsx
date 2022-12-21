import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Components
import StoreInfoPanel from './components/StoreInfo';

// Store / APIs
import { useGetStoreInfoQuery } from 'store/api/stores/api';

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

// Types
import { IValue } from 'store/api/types';
import { IState } from 'pages/types';

// Utils
import { renderLoader } from 'pages/utils';

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
  const retailer = rowData?.retailer as unknown as IValue;

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handlePrevious = () => navigate(-1);

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handlePrevious} data-testid="stores-link">
          Stores
        </StyledTypography>
        <StyledTypography color="text.primary">{`${retailer?.name} ${rowData?.name}`}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" gutterBottom>
        {`${retailer?.name} ${rowData?.name}`}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom>
        {`${rowData?.addressLine1}, ${rowData?.suburb} ${rowData?.state} ${rowData?.postcode}`}
      </StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Store information" id="tab-0" aria-controls="store-detail-0" disableRipple />
      </StyledTabs>
      <StoreInfoPanel value={currentTab} index={0} data={rowData} />
    </div>
  );

  return <ContentDetails>{isLoading ? renderLoader('calc(100vh - 36px)', 100, 3) : renderContent()}</ContentDetails>;
};

export default StoreDetails;
