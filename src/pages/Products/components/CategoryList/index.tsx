import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import CustomEmptyState from 'components/EmptyState';
import { CircularLoaderWrapper, SpaceBetweenDiv } from 'pages/styles';
import { useGetParentCategoriesQuery } from 'store/api/products/api';
import { IValue } from 'store/api/types';
import { BtnWrapper, DivWrapper, ManageCategoriesBtn, StyledList, StyledListItemButton } from './styles';
import { ICategoryListProps } from './types';

const CategoryList = ({ onManageCategoriesClick, onRowClick }: ICategoryListProps) => {
  // API call
  const { data, isFetching } = useGetParentCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [parentCategoryData, setParentCategoryData] = useState<IValue[]>(data ?? []);

  useEffect(() => {
    const sortedData = data?.slice();
    sortedData?.sort((a, b) => {
      if (a.categoryName < b.categoryName) return -1;
      if (a.categoryName > b.categoryName) return 1;
      return 0;
    });
    setParentCategoryData(sortedData ?? []);
  }, [data]);

  const handleCategoryClick = (category: IValue) => () => {
    setSelectedCategory(category?.id as string);
    if (typeof onRowClick === 'function') onRowClick(category);
  };

  const renderLoader = () => (
    <CircularLoaderWrapper height="400px">
      <CircularProgress size={100} thickness={3} />
    </CircularLoaderWrapper>
  );

  // Uncomment once CORS issue is resolved
  const generateData = () => {
    if (isFetching) return renderLoader();
    else if (parentCategoryData?.length === 0)
      return <CustomEmptyState height="400px" displayText="No Parent Categories found." />;

    return parentCategoryData?.map((category) => (
      <StyledListItemButton
        key={category.id as string}
        selected={selectedCategory === category.id}
        onClick={handleCategoryClick(category)}
      >
        <SpaceBetweenDiv withmargin={false} style={{ width: '100%' }}>
          <span className="item category-label">{category.categoryName}</span>
          <span className="item category-value">{category.productCount}</span>
        </SpaceBetweenDiv>
      </StyledListItemButton>
    ));
  };

  return (
    <DivWrapper>
      <div style={{ margin: '10px' }}>
        <span className="category-sections">Parent Categories</span>
      </div>
      <StyledList>{generateData()}</StyledList>
      <BtnWrapper>
        <ManageCategoriesBtn
          data-testid="manage-categories-btn"
          className="manage-categories-btn"
          variant="contained"
          disableElevation
          height={40}
          onClick={onManageCategoriesClick}
          disabled={isFetching}
        >
          Manage categories
        </ManageCategoriesBtn>
      </BtnWrapper>
    </DivWrapper>
  );
};

export default CategoryList;
