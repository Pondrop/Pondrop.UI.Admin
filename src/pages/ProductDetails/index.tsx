import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment, { MomentInput } from 'moment';

// Components
import ActivityInfoPanel from './components/ActivityInfoPanel';
import ProductInfoPanel from './components/ProductInfoPanel';

// Store / APIs
import { useGetFullProductInfoQuery } from 'store/api/products/api';

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
import { IFullProductInfo } from 'store/api/products/types';
import { IState } from 'pages/types';

// Utils
import { renderLoader } from 'pages/utils';

const ProductDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [productData, setProductData] = useState<IFullProductInfo>({} as IFullProductInfo);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();
  const { product_id } = useParams();

  // API values
  const { data, isFetching } = useGetFullProductInfoQuery({ productId: product_id ?? '' });

  const state = location?.state as IState;

  useEffect(() => {
    setProductData(data ?? ({} as IFullProductInfo));
  }, [data]);

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handlePrevious = () => navigate(-1);

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handlePrevious} data-testid="products-link">
          Products
        </StyledTypography>
        <StyledTypography color="text.primary">{productData?.name}</StyledTypography>
      </StyledBreadcrumbs>
      <StyledTitle variant="h5" style={{ margin: '0' }}>
        {productData?.name}
      </StyledTitle>
      <StyledTitle className="main-header" variant="caption">
        Last updated: {moment(state?.rowData?.updatedUtc as MomentInput).format('Do MMMM YYYY @ h:mm:ss a')}
      </StyledTitle>
      <StyledSubtitle variant="subtitle1" gutterBottom paddingBottom={50}></StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Product information" id="tab-0" aria-controls="product-detail-0" disableRipple />
        <StyledTab label="Activity" id="tab-1" aria-controls="product-detail-1" disableRipple />
      </StyledTabs>
      <ProductInfoPanel value={currentTab} index={0} data={productData} />
      <ActivityInfoPanel value={currentTab} index={1} data={productData} />
    </div>
  );

  return <ContentDetails>{isLoading ? renderLoader('calc(100vh - 36px)', 100, 3) : renderContent()}</ContentDetails>;
};

export default ProductDetails;
