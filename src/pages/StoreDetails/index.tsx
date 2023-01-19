import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import StoreInfoPanel from './components/StoreInfo';

// Store / APIs
import { useGetFullStoreInfoQuery } from 'store/api/stores/api';

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

// Utils
import { renderLoader } from 'pages/utils';

const StoreDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  // React router dom values
  const navigate = useNavigate();
  const { store_id } = useParams();

  const { data, isFetching } = useGetFullStoreInfoQuery({ storeId: store_id ?? '' });

  const addressData = data?.addresses[0];
  const retailer = data?.retailer;

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
        <StyledTypography color="text.primary">{`${retailer?.name} ${data?.name}`}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" gutterBottom>
        {`${retailer?.name} ${data?.name}`}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom>
        {`${addressData?.addressLine1}, ${addressData?.suburb} ${addressData?.state} ${addressData?.postcode}`}
      </StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Store information" id="tab-0" aria-controls="store-detail-0" disableRipple />
      </StyledTabs>
      <StoreInfoPanel value={currentTab} index={0} data={data as unknown as IValue} />
    </div>
  );

  return <ContentDetails>{isFetching ? renderLoader('calc(100vh - 36px)', 100, 3) : renderContent()}</ContentDetails>;
};

export default StoreDetails;
