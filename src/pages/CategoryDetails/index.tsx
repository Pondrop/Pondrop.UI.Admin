import { FunctionComponent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { useCreateCategoryMutation } from 'store/api/categories/api';
import { ICreateCategoryRequest } from 'store/api/categories/types';
import CategoryInfoPanel from './components/CategoryInfoPanel';

import {
  CategoryBtnWrapper,
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
  const navigate = useNavigate();
  const isCreate = useMatch('/categories/create');

  // Handlers
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

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

  const renderContent = () => (
    <div>
      <StyledBreadcrumbs aria-label="breadcrumb">
        <StyledTypography className="link" onClick={handlePrevious} data-testid="products-link">
          Categories
        </StyledTypography>
        <StyledTypography color="text.primary">Create new category</StyledTypography>
      </StyledBreadcrumbs>
      <SpaceBetweenDiv withmargin={false}>
        <StyledTitle variant="h5" gutterBottom>
          Create New Category
        </StyledTitle>
        {renderAddCategoryBtn()}
      </SpaceBetweenDiv>
      <StyledSubtitle variant="subtitle1" gutterBottom ismodify={1}></StyledSubtitle>
      <StyledTabs value={currentTab} onChange={handleChange}>
        <StyledTab label="Category information" id="tab-0" aria-controls="category-detail-0" disableRipple />
      </StyledTabs>
      <CategoryInfoPanel value={currentTab} index={0} data={{}} isCreate={!!isCreate} requestRef={createCategoryRef} />
    </div>
  );

  return <ContentDetails>{renderContent()}</ContentDetails>;
};

export default CategoryDetails;
