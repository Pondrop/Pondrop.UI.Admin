import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Link } from '@mui/material';
import { useGetStoreInfoQuery } from 'store/api/stores/api';

import StoreInfoPanel from './components/StoreInfo';

import {
  CircularLoaderWrapper,
  ContentWrapper,
  StyledBreadcrumbs,
  StyledSubtitle,
  StyledTab,
  StyledTabs,
  StyledTitle,
  StyledTypography,
} from './styles';

const StoreDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { store_id } = useParams();
  const { data, isFetching } = useGetStoreInfoQuery({ storeId: store_id ?? '' });

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const renderLoader = () => (
    <CircularLoaderWrapper>
      <CircularProgress size={100} thickness={3} />
    </CircularLoaderWrapper>
  );

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/stores" data-testid="stores-link">
          Stores
        </Link>
        <StyledTypography color="text.primary">{data?.value[0]?.['Name']}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" gutterBottom>
        {data?.value[0]?.['Name']}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom>
        {`${data?.value[0]?.['Street']}, ${data?.value[0]?.['City']} ${data?.value[0]?.['State']} ${data?.value[0]?.['Zip_Code']}`}
      </StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Store information" id="tab-0" aria-controls="detail-0" disableRipple />
      </StyledTabs>
      <StoreInfoPanel value={currentTab} index={0} data={data?.value[0]} />
    </div>
  );

  return <ContentWrapper>{isFetching ? renderLoader() : renderContent()}</ContentWrapper>;
};

export default StoreDetails;
