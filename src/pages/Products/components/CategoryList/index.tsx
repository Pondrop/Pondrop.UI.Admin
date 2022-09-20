import { useState } from 'react';

import { SpaceBetweenDiv } from 'pages/styles';
import { IValue } from 'store/api/types';
import { categoryDummyData } from './constants';
import { BtnWrapper, DivWrapper, ManageCategoriesBtn, StyledList, StyledListItemButton } from './styles';
import { ICategoryListProps } from './types';

const CategoryList = ({ onManageCategoriesClick, onRowClick }: ICategoryListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryClick = (category: IValue) => () => {
    setSelectedCategory(category?.Id as string);
    if (typeof onRowClick === 'function') onRowClick(category);
  };

  const generateData = () => {
    return categoryDummyData.map((category) => (
      <StyledListItemButton
        key={category.Id}
        selected={selectedCategory === category.Id}
        onClick={handleCategoryClick(category)}
      >
        <SpaceBetweenDiv withmargin={false} style={{ width: '100%' }}>
          <span className="item category-label">{category.Category}</span>
          <span className="item category-value">{category.Count.toLocaleString()}</span>
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
        >
          Manage categories
        </ManageCategoriesBtn>
      </BtnWrapper>
    </DivWrapper>
  );
};

export default CategoryList;
