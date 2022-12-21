import { useEffect, useState } from 'react';

// Components
import CustomEmptyState from 'components/EmptyState';

// Store / APIs
import { useAppSelector } from 'store';
import { useGetParentCategoriesQuery } from 'store/api/products/api';
import { selectProducts } from 'store/api/products/slice';

// Styles
import { SpaceBetweenDiv } from 'pages/styles';
import { BtnWrapper, DivWrapper, ManageCategoriesBtn, StyledList, StyledListItemButton } from './styles';

// Types
import { IValue } from 'store/api/types';
import { ICategoryListProps } from './types';

// Utils
import { renderLoader } from 'pages/utils';

const CategoryList = ({ onManageCategoriesClick, sortedData, handleParentCategoryClick }: ICategoryListProps) => {
  const { selectedParent } = useAppSelector(selectProducts);

  // API call
  const { isFetching } = useGetParentCategoriesQuery();
  const [parentCategoryData, setParentCategoryData] = useState<IValue[]>(sortedData ?? []);

  useEffect(() => {
    setParentCategoryData(sortedData ?? []);
  }, [sortedData]);

  const handleCategoryClick = (category: IValue) => () => {
    handleParentCategoryClick(category);
  };

  const generateData = () => {
    if (isFetching) return renderLoader('400px', 100, 3);
    else if (parentCategoryData?.length === 0)
      return <CustomEmptyState height="400px" displayText="No Parent Categories found." />;

    return parentCategoryData?.map((category) => (
      <StyledListItemButton
        key={category.id as string}
        selected={selectedParent === category.id}
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
