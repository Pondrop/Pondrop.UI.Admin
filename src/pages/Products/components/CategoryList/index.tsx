import { useState } from 'react';

import { SpaceBetweenDiv } from 'pages/styles';
import { categoryDummyData } from './constants';
import { BtnWrapper, DivWrapper, ManageCategoriesBtn, StyledList, StyledListItemButton } from './styles';

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryClick = (id: string) => () => {
    setSelectedCategory(id);
  };

  const generateData = () => {
    return categoryDummyData.map((category) => (
      <StyledListItemButton
        key={category.Id}
        selected={selectedCategory === category.Id}
        onClick={handleCategoryClick(category.Id)}
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
        <span className="category-sections">Category sections</span>
      </div>
      <StyledList>{generateData()}</StyledList>
      <BtnWrapper>
        <ManageCategoriesBtn
          data-testid="manage-categories-btn"
          className="manage-categories-btn"
          variant="contained"
          disableElevation
          height={40}
        >
          Manage categories
        </ManageCategoriesBtn>
      </BtnWrapper>
    </DivWrapper>
  );
};

export default CategoryList;
