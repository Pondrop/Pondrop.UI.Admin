import { FunctionComponent, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { IState } from 'pages/types';
import { useGetCategoryInfoQuery } from 'store/api/categories/api';
import CategoryInfoPanel from './components/CategoryInfoPanel';
import {
  CategoryBtnWrapper,
  CircularLoaderWrapper,
  ColAlignDiv,
  ContentDetails,
  SpaceBetweenDiv,
  StyledBreadcrumbs,
  StyledCategoryBtn,
  StyledSubtitle,
  StyledTab,
  StyledTabs,
  StyledTitle,
  StyledTypography,
} from '../styles';

const CategoryDetails: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();
  const { category_id } = useParams();

  // API values
  const { data, isFetching } = useGetCategoryInfoQuery({ categoryId: category_id ?? '' }, { skip: !!location.state });

  const state = location?.state as IState;
  const rowData = state?.rowData ?? data?.value[0];
  const isLoading = state?.rowData ? false : isFetching;

  // Handlers
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handlePrevious = () => navigate(-1);

  const renderLoader = () => (
    <CircularLoaderWrapper height="calc(100vh - 36px)">
      <CircularProgress size={100} thickness={3} />
    </CircularLoaderWrapper>
  );

  const renderUpdateCategoryBtn = () => (
    <CategoryBtnWrapper rightmargin={32} style={{ alignSelf: 'flex-start' }}>
      <StyledCategoryBtn
        data-testid="update-category-btn"
        className="update-category-btn"
        variant="contained"
        disableElevation
        height={40}
        disabled={true}
      >
        + Update Category
      </StyledCategoryBtn>
    </CategoryBtnWrapper>
  );

  const renderHeader = () => {
    return (
      <>
        <SpaceBetweenDiv withmargin={false}>
          <ColAlignDiv>
            <StyledTitle variant="h5" gutterBottom>
              {rowData?.['Category']}
            </StyledTitle>
            <StyledSubtitle variant="subtitle1" gutterBottom paddingBottom={60}></StyledSubtitle>
          </ColAlignDiv>
          {renderUpdateCategoryBtn()}
        </SpaceBetweenDiv>
      </>
    );
  };

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handlePrevious} data-testid="categories-link">
          Categories
        </StyledTypography>
        <StyledTypography color="text.primary">{rowData?.['Category']}</StyledTypography>
      </StyledBreadcrumbs>
      {renderHeader()}
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Category information" id="tab-0" aria-controls="category-detail-0" disableRipple />
      </StyledTabs>
      <CategoryInfoPanel value={currentTab} index={0} data={rowData} />
    </div>
  );

  return <ContentDetails>{isLoading ? renderLoader() : renderContent()}</ContentDetails>;
};

export default CategoryDetails;
