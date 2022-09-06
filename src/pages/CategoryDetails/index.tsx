import { FunctionComponent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { IState } from 'pages/types';
import { useGetCategoryInfoQuery, useCreateCategoryMutation } from 'store/api/categories/api';
import { ICreateCategoryRequest } from 'store/api/categories/types';
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
  const createCategoryRef = useRef<ICreateCategoryRequest>({
    categoryName: '',
    description: '',
  });

  // Microservice endpoints
  const [createCategory, { isSuccess }] = useCreateCategoryMutation({
    fixedCacheKey: 'shared-snackbar-state',
  });

  // React router dom values
  const location = useLocation();
  const navigate = useNavigate();
  const isCreate = useMatch('/categories/create');
  const { category_id } = useParams();

  // API values
  const { data, isFetching } = useGetCategoryInfoQuery({ categoryId: category_id ?? '' }, { skip: !!location.state });

  const state = location?.state as IState;
  const rowData = state?.rowData ?? data?.value[0];
  const isLoading = state?.rowData ? false : isFetching;

  const linkLabel = isCreate ? 'Create new category' : rowData?.['Category'];

  // Handlers
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const renderLoader = () => (
    <CircularLoaderWrapper>
      <CircularProgress size={100} thickness={3} />
    </CircularLoaderWrapper>
  );

  const handlePrevious = () => navigate(-1);

  const handleAddCategory = () => {
    createCategory(createCategoryRef.current);
  };

  // useEffects
  useEffect(() => {
    if (isSuccess) navigate('../categories', { replace: true });
  }, [isSuccess]);

  const renderAddCategoryBtn = () => (
    <CategoryBtnWrapper rightmargin={32}>
      <StyledCategoryBtn
        sx={{ marginRight: '20px' }}
        data-testid="cancel-btn"
        className="cancel-btn"
        disableElevation
        onClick={handlePrevious}
        height={40}
      >
        Cancel
      </StyledCategoryBtn>
      <StyledCategoryBtn
        data-testid="add-category-btn"
        className="add-category-btn"
        variant="contained"
        disableElevation
        onClick={handleAddCategory}
        height={40}
      >
        + Create Category
      </StyledCategoryBtn>
    </CategoryBtnWrapper>
  );

  const renderUpdateCategoryBtn = () => (
    <CategoryBtnWrapper rightmargin={32}>
      <StyledCategoryBtn
        data-testid="update-category-btn"
        className="update-category-btn"
        variant="contained"
        disableElevation
        onClick={handleAddCategory}
        height={40}
      >
        + Update Category
      </StyledCategoryBtn>
    </CategoryBtnWrapper>
  );

  const renderHeader = () => {
    if (isCreate)
      return (
        <>
          <SpaceBetweenDiv withmargin={false}>
            <StyledTitle variant="h5" gutterBottom>
              Create New Category
            </StyledTitle>
            {renderAddCategoryBtn()}
          </SpaceBetweenDiv>
          <StyledSubtitle variant="subtitle1" gutterBottom ismodify={1}></StyledSubtitle>
        </>
      );
    else
      return (
        <>
          <SpaceBetweenDiv withmargin={false}>
            <ColAlignDiv>
              <StyledTitle variant="h5" gutterBottom>
                {rowData?.['Category']}
              </StyledTitle>
              <StyledSubtitle variant="subtitle1" gutterBottom>
                Product Last Updated: 12th August, 2022 @ 10:01am
              </StyledSubtitle>
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
        <StyledTypography color="text.primary">{linkLabel}</StyledTypography>
      </StyledBreadcrumbs>
      {renderHeader()}
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Category information" id="tab-0" aria-controls="category-detail-0" disableRipple />
      </StyledTabs>
      <CategoryInfoPanel
        value={currentTab}
        index={0}
        data={rowData}
        isCreate={!!isCreate}
        requestRef={createCategoryRef}
      />
    </div>
  );

  return <ContentDetails>{isLoading ? renderLoader() : renderContent()}</ContentDetails>;
};

export default CategoryDetails;
