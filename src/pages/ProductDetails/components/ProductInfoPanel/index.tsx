import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { EditOutlined, Info } from '@mui/icons-material';

import Chips from 'components/Chips';
import { StyledChipWrapper } from 'components/Grid/styles';
import {
  ColAlignDiv,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCard,
  StyledCardTitle,
  StyledTabContent,
} from 'pages/styles';
import { ITabPanelProps } from 'pages/types';
import { ICategories, IValue } from 'store/api/types';
import {
  attributesChips,
  categoryChips,
  organisationTestData,
  packagingTestData,
  productTestData,
  tooltipContent,
} from './constants';

const ProductInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [productInfo, setProductInfo] = useState<IValue>({});

  useEffect(() => {
    setProductInfo(data ?? {});
  }, [data]);

  const renderCategoriesChips = () => {
    return (
      <StyledChipWrapper>
        {categoryChips.map((val: ICategories) => (
          <Chips key={val.id} label={val.name} />
        ))}
      </StyledChipWrapper>
    );
  };

  const renderAttributesChips = () => {
    return (
      <StyledChipWrapper>
        {attributesChips.map((val: ICategories) => (
          <Chips key={val.id} label={val.name} />
        ))}
      </StyledChipWrapper>
    );
  };

  const renderProductInfo = () => {
    return (
      <ColAlignDiv>
        <span className="row-label card-details">{productTestData[0].label}</span>
        <span className="row-value singleline card-details" style={{ marginBottom: '12px', maxWidth: '100%' }}>
          {productTestData[0].value}
        </span>
        <span className="row-label card-details">{productTestData[1].label}</span>
        <span className="row-value multiline card-details" style={{ maxWidth: '100%' }}>
          {productTestData[1].value}
        </span>
        <ul style={{ paddingInlineStart: '16px' }}>
          <li className="row-value card-details">Rich in calcium</li>
          <li className="row-value card-details">Natural source of protein</li>
          <li className="row-value card-details">No artificial additives or preservatives</li>
        </ul>
        <span className="row-value card-details">Enjoy as part of a healthy and balanced diet</span>
        <span className="row-value card-details">Australian milk</span>
        <span className="row-value card-details">Fresh milk</span>
        <span className="row-value card-details">From Australian farmers</span>
        <span className="row-value card-details">Rich in calcium</span>
        <span className="row-value card-details">Natural source of protein</span>
        <span className="row-value card-details">High quality.</span>
        <span className="row-value card-details">Nutritious and delicious milk.</span>
      </ColAlignDiv>
    );
  };

  const renderPackagingDetails = () => {
    return packagingTestData.map((row) => (
      <SpaceBetweenDiv style={{ marginBottom: '12px' }}>
        <span className="row-label card-details" style={{ lineHeight: '20px' }}>
          {row.label}
        </span>
        <span className="row-value singleline card-details" style={{ lineHeight: '20px' }}>
          {row.value}
        </span>
      </SpaceBetweenDiv>
    ));
  };

  const renderOrganisationDetails = () => {
    return organisationTestData.map((row) => (
      <SpaceBetweenDiv style={{ marginBottom: '12px' }}>
        <span className="row-label card-details" style={{ lineHeight: '20px' }}>
          {row.label}
        </span>
        <span className="row-value singleline card-details" style={{ lineHeight: '20px' }}>
          {row.value}
        </span>
      </SpaceBetweenDiv>
    ));
  };

  return (
    <StyledTabContent role="tabpanel" hidden={value !== index} id="product-detail-0" aria-labelledby="tab-0">
      <RowAlignWrapper className="right-margin">
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Categories
                <Tooltip title={tooltipContent['categories']} placement="top">
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderCategoriesChips()}
        </StyledCard>
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Attributes
                <Tooltip title={tooltipContent['attributes']} placement="top">
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderAttributesChips()}
        </StyledCard>
      </RowAlignWrapper>
      <RowAlignWrapper className="right-margin">
        <StyledCard width="100%" height="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Product
                <Tooltip title={tooltipContent['product']} placement="top">
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderProductInfo()}
        </StyledCard>
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Packaging
                <Tooltip title={tooltipContent['packaging']} placement="top">
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderPackagingDetails()}
        </StyledCard>
        <StyledCard width="100%">
          <StyledCardTitle variant="h6" gutterBottom style={{ fontWeight: 600 }}>
            <SpaceBetweenDiv withmargin={false}>
              <RowAlignWrapper>
                Organisation
                <Tooltip title={tooltipContent['organisation']} placement="top">
                  <div className="info-icon" style={{ marginLeft: '8px' }}>
                    <Info />
                  </div>
                </Tooltip>
              </RowAlignWrapper>
              <IconButton aria-label="edit" size="small">
                <EditOutlined fontSize="inherit" />
              </IconButton>
            </SpaceBetweenDiv>
          </StyledCardTitle>
          {renderOrganisationDetails()}
        </StyledCard>
      </RowAlignWrapper>
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
