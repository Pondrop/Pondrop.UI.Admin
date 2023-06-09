import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { EditOutlined, Info } from '@mui/icons-material';

// Components
import LinkedProducts from '../LinkedProducts';

// Constants
import { categoryTitles } from './constants';

// Styles
import {
  ColAlignDiv,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCard,
  StyledCardTitle,
  StyledTabContent,
} from 'pages/styles';

// Types
import { IValue } from 'store/api/types';
import { ITabPanelProps } from 'pages/types';

const ProductInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [categoryInfo, setCategoryInfo] = useState<IValue>({});

  useEffect(() => {
    setCategoryInfo(data ?? {});
  }, [data]);

  const renderDetails = () => {
    return (
      <ColAlignDiv>
        <span className="row-label card-details">{categoryTitles[0].label}</span>
        <span className="row-value singleline card-details" style={{ marginBottom: '12px', maxWidth: '100%' }}>
          {categoryInfo?.[categoryTitles[0].field]}
        </span>
        <span className="row-label card-details">{categoryTitles[1].label}</span>
        <span className="row-value multiline card-details" style={{ maxWidth: '100%' }}>
          {categoryInfo?.[categoryTitles[1].field]}
        </span>
      </ColAlignDiv>
    );
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="category-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper className="right-margin">
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Category
                <div className="info-icon" style={{ marginLeft: '8px' }}>
                  <Info />
                </div>
              </RowAlignWrapper>
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderDetails()}
        </StyledCard>
      </RowAlignWrapper>
      <RowAlignWrapper className="right-margin">
        <StyledCard className="grid-card" width="100%" height="fit-content">
          <LinkedProducts
            categoryName={categoryInfo?.categoryName as string}
            categoryId={categoryInfo?.lowerLevelCategoryId as string}
          />
        </StyledCard>
      </RowAlignWrapper>
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
