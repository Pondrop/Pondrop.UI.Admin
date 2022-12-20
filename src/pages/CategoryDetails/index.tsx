import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

// Components
import ActivityInfoPanel from './components/ActivityInfoPanel';
import CategoryInfoPanel from './components/CategoryInfoPanel';

// Store / APIs
import { useGetCategoryInfoQuery } from 'store/api/categories/api';

// Styles
import {
  CircularLoaderWrapper,
  ColAlignDiv,
  ContentDetails,
  SpaceBetweenDiv,
  StyledBreadcrumbs,
  StyledSubtitle,
  StyledTab,
  StyledTabs,
  StyledTitle,
  StyledTypography,
} from '../styles';

// Types
import { IState } from 'pages/types';

const CategoryDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();
  const { category_id } = useParams();

  // API values
  const { data, isFetching } = useGetCategoryInfoQuery(
    {
      categoryField: 'lowerLevelCategoryId',
      categoryId: category_id ?? String((location.state as IState)?.rowData?.id) ?? '',
    },
    { skip: !!(location.state as IState)?.rowData?.['categoryName'] },
  );

  const state = location?.state as IState;
  const rowData = state?.rowData?.['categoryName'] ? state?.rowData : data?.value[0];
  const isLoading = state?.rowData ? false : isFetching;

  // Handlers
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handlePrevious = () => navigate(-1);

  const handleProductsRedirect = () => {
    navigate('../products', { replace: true });
  };

  // Loader shown when fetching API response
  const renderLoader = () => (
    <CircularLoaderWrapper height="calc(100vh - 36px)">
      <CircularProgress size={100} thickness={3} />
    </CircularLoaderWrapper>
  );

  const renderHeader = () => {
    return (
      <>
        <SpaceBetweenDiv withmargin={false}>
          <ColAlignDiv>
            <StyledTitle variant="h5" style={{ margin: '0' }}>
              {rowData?.['categoryName']}
            </StyledTitle>
            <StyledTitle className="main-header" variant="caption">
              Last updated: 12th August, 2022 @ 10:01am
            </StyledTitle>
            <StyledSubtitle variant="subtitle1" gutterBottom paddingBottom={50}></StyledSubtitle>
          </ColAlignDiv>
        </SpaceBetweenDiv>
      </>
    );
  };

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handleProductsRedirect} data-testid="products-link">
          Products
        </StyledTypography>
        <StyledTypography className="link" onClick={handlePrevious} data-testid="categories-link">
          Categories
        </StyledTypography>
        <StyledTypography color="text.primary">{rowData?.['categoryName']}</StyledTypography>
      </StyledBreadcrumbs>
      {renderHeader()}
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Category information" id="tab-0" aria-controls="category-detail-0" disableRipple />
        <StyledTab label="Activity" id="tab-1" aria-controls="category-detail-1" disableRipple />
      </StyledTabs>
      <CategoryInfoPanel value={currentTab} index={0} data={rowData} />
      <ActivityInfoPanel value={currentTab} index={1} data={rowData} />
    </div>
  );

  return <ContentDetails>{isLoading ? renderLoader() : renderContent()}</ContentDetails>;
};

export default CategoryDetails;
