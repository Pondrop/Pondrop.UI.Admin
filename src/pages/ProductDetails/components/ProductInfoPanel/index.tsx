import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, Snackbar, Tooltip } from '@mui/material';
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
import {
  useGetUpdatedProductInfoQuery,
  useLazyGetProductInfoQuery,
  useUpdateLinkedCategoriesMutation,
} from 'store/api/products/api';
import { ICategories, IValue } from 'store/api/types';
import UpdateCategoriesDialog from '../UpdateCategoriesDialog';
import { attributesChips, organisationTestData, packagingTestData, productTestData, tooltipContent } from './constants';

const ProductInfoPanel = ({ value, index, data }: ITabPanelProps): JSX.Element => {
  const [productInfo, setProductInfo] = useState<IValue>({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryChips, setCategoryChips] = useState<IValue[]>([]);

  const navigate = useNavigate();

  console.log('data ', data);

  //const [getProductInfo, { data: newProductData }] = useLazyGetProductInfoQuery();

  const [
    updateLinkedCategories,
    { isSuccess: isUpdateCategoriesSuccess, reset: resetUpdateCategories, isLoading: isUpdateCategoriesLoading },
  ] = useUpdateLinkedCategoriesMutation();

  const renderCategoriesChips = () => {
    return (
      <StyledChipWrapper>
        {(productInfo?.categories as unknown as ICategories[])?.map((val: ICategories, index: number) => {
          const handleChipClick = () => {
            navigate(`/products/categories/${val.id}`, { state: { rowData: val } });
          };

          return <Chips key={`${val.id}-${productInfo?.id}-${index}`} label={val.name} onChipClick={handleChipClick} />;
        })}
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
          {productInfo?.name}
        </span>
        <span className="row-label card-details">{productTestData[1].label}</span>
        <span className="row-value multiline card-details" style={{ maxWidth: '100%' }}>
          {productInfo?.shortDescription}
        </span>
        {/* <ul style={{ paddingInlineStart: '16px' }}>
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
        <span className="row-value card-details">Nutritious and delicious milk.</span> */}
      </ColAlignDiv>
    );
  };

  const renderPackagingDetails = () => {
    return packagingTestData.map((row) => (
      <SpaceBetweenDiv style={{ marginBottom: '12px' }} key={row.field}>
        <span className="row-label card-details" style={{ lineHeight: '20px' }}>
          {row.label}
        </span>
        <span className="row-value singleline card-details" style={{ lineHeight: '20px' }}>
          {productInfo?.[row.field] ?? '-'}
        </span>
      </SpaceBetweenDiv>
    ));
  };

  const renderOrganisationDetails = () => {
    return organisationTestData.map((row) => (
      <SpaceBetweenDiv style={{ marginBottom: '12px' }} key={row.field}>
        <span className="row-label card-details" style={{ lineHeight: '20px' }}>
          {row.label}
        </span>
        <span className="row-value singleline card-details" style={{ lineHeight: '20px' }}>
          {productInfo?.[row.field] ?? '-'}
        </span>
      </SpaceBetweenDiv>
    ));
  };

  const handleUpdateCategoryOpen = () => {
    setIsUpdateCategoryModalOpen(true);
  };

  const handleUpdateCategoryClose = () => {
    setIsUpdateCategoryModalOpen(false);
  };

  const handleUpdateCategories = (newCategories: string[]) => {
    updateLinkedCategories({
      productId: String(productInfo?.id),
      categoryIds: [...newCategories],
      publicationLifecycleId: '1',
    });
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    resetUpdateCategories();
  };

  useEffect(() => {
    setProductInfo(data ?? {});
    const categoriesData = data?.categories as unknown as IValue[];
    if (categoriesData.length > 0) {
      const categoryIds: string[] = [];
      const categoryChips: IValue[] = [];

      categoriesData.forEach((category) => {
        categoryIds.push(String(category.id));
        categoryChips.push(category);
      });
      setCategories(categoryIds);
      setCategoryChips(categoryChips);
    }
  }, [data]);

  useEffect(() => {
    setIsSnackbarOpen(isUpdateCategoriesSuccess);
    if (isUpdateCategoriesSuccess) {
      handleUpdateCategoryClose();
      //getProductInfo({ productId: String(data?.id) });
    }
  }, [isUpdateCategoriesSuccess]);

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
              <IconButton aria-label="edit" size="small" onClick={handleUpdateCategoryOpen}>
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          Changes saved successfully
        </Alert>
      </Snackbar>
      <UpdateCategoriesDialog
        isOpen={isUpdateCategoryModalOpen}
        handleSubmit={handleUpdateCategories}
        handleClose={handleUpdateCategoryClose}
        categories={categories}
        categoryChips={categoryChips}
        isLoading={isUpdateCategoriesLoading}
      />
    </StyledTabContent>
  );
};

export default ProductInfoPanel;
