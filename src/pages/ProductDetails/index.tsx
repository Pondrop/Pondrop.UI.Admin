import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useGetProductInfoQuery } from 'store/api/products/api';
import ProductInfoPanel from './components/ProductInfoPanel';
import { IState } from 'pages/types';

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

const ProductDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();
  const { product_id } = useParams();

  // API values
  const { data, isFetching } = useGetProductInfoQuery({ productId: product_id ?? '' }, { skip: !!location.state });

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
        <StyledTypography className="link" onClick={handlePrevious} data-testid="products-link">
          Products
        </StyledTypography>
        <StyledTypography color="text.primary">{rowData?.['Product']}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" gutterBottom>
        {rowData?.['Product']}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom paddingBottom={60}></StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Product information" id="tab-0" aria-controls="product-detail-0" disableRipple />
      </StyledTabs>
      <ProductInfoPanel value={currentTab} index={0} data={rowData} />
    </div>
  );

  return <ContentDetails>{isLoading ? renderLoader() : renderContent()}</ContentDetails>;
};

export default ProductDetails;
