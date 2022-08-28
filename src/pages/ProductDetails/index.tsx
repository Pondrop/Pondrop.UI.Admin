import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useGetProductInfoQuery } from 'store/api/products/api';
import ProductInfoPanel from './components/ProductInfoPanel';

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
  const navigate = useNavigate();
  const { product_id } = useParams();

  // API values
  const { data, isFetching } = useGetProductInfoQuery({ productId: product_id ?? '' });

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const renderLoader = () => (
    <CircularLoaderWrapper>
      <CircularProgress size={100} thickness={3} />
    </CircularLoaderWrapper>
  );

  const handlePrevious = () => navigate(-1);

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handlePrevious}>
          Products
        </StyledTypography>
        <StyledTypography color="text.primary">{data?.value[0]?.['Product']}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" gutterBottom>
        {data?.value[0]?.['Product']}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom>
        Product Last Updated: 12th August, 2022 @ 10:01am
      </StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Product information" id="tab-0" aria-controls="product-detail-0" disableRipple />
      </StyledTabs>
      <ProductInfoPanel value={currentTab} index={0} data={data?.value[0]} />
    </div>
  );

  return <ContentDetails>{isFetching ? renderLoader() : renderContent()}</ContentDetails>;
};

export default ProductDetails;
