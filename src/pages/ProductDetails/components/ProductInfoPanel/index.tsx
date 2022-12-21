import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, Snackbar, Tooltip } from '@mui/material';
import { EditOutlined, Info } from '@mui/icons-material';

// Components
import Chips from 'components/Chips';
import UpdateCategoriesDialog from 'components/UpdateCategoriesDialog';

// Constants
import { attributesChips, organisationTitles, packagingTitles, productDescTitles, tooltipContent } from './constants';

// Store / APIs
import { useAppDispatch, useAppSelector } from 'store';
import {
  productsApi,
  productsMicroService,
  useGetFullProductInfoQuery,
  useGetProductsQuery,
  useLazyRefreshProductsQuery,
  useUpdateLinkedCategoriesMutation,
} from 'store/api/products/api';
import { selectProducts } from 'store/api/products/slice';

// Styles
import {
  ColAlignDiv,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCard,
  StyledCardTitle,
  StyledChipWrapper,
  StyledTabContent,
} from 'pages/styles';

// Types
import { IFullProductInfo } from 'store/api/products/types';
import { ICategories, IValue } from 'store/api/types';
import { IProductDetailTabProps } from '../types';

const ProductInfoPanel = ({ value, index, data }: IProductDetailTabProps): JSX.Element => {
  const [productInfo, setProductInfo] = useState<IFullProductInfo>({} as IFullProductInfo);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryChips, setCategoryChips] = useState<IValue[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { refetch, isSuccess: isGetFullProductSuccess } = useGetFullProductInfoQuery({ productId: data?.id ?? '' });

  const [
    updateLinkedCategories,
    { isSuccess: isUpdateCategoriesSuccess, reset: resetUpdateCategories, isLoading: isUpdateCategoriesLoading },
  ] = useUpdateLinkedCategoriesMutation({ fixedCacheKey: 'update-categories-mutation' });

  const [refreshProducts, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] =
    useLazyRefreshProductsQuery();

  const {
    filterItem,
    searchValue = '',
    selectedCategories = [],
    selectedParent,
    sortValue,
  } = useAppSelector(selectProducts);
  const { refetch: refetchProducts } = useGetProductsQuery({
    searchString: searchValue,
    sortValue,
    filterItem,
    prevPageItems: 0,
    pageSize: 20,
    parentCategory: selectedParent,
    selectedCategories,
  });

  const renderCategoriesChips = () => {
    return (
      <StyledChipWrapper>
        {productInfo?.categories ? (
          (productInfo?.categories as unknown as ICategories[])?.map((val: ICategories, index: number) => {
            const handleChipClick = () => {
              navigate(`/products/categories/${val.id}`, { state: { rowData: val } });
            };

            return (
              <Chips key={`${val.id}-${productInfo?.id}-${index}`} label={val.name} onChipClick={handleChipClick} />
            );
          })
        ) : (
          <i style={{ lineHeight: '40px', fontSize: '12px' }}>No linked categories available</i>
        )}
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
        <span className="row-label card-details">{productDescTitles[0].label}</span>
        <span className="row-value singleline card-details" style={{ marginBottom: '12px', maxWidth: '100%' }}>
          {productInfo?.name}
        </span>
        <span className="row-label card-details">{productDescTitles[1].label}</span>
        <span className="row-value multiline card-details" style={{ maxWidth: '100%' }}>
          {productInfo?.shortDescription ?? 'N/A'}
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
    return packagingTitles.map((row) => (
      <SpaceBetweenDiv style={{ marginBottom: '12px' }} key={row.field}>
        <span className="row-label card-details" style={{ lineHeight: '20px' }}>
          {row.label}
        </span>
        <span className="row-value singleline card-details" style={{ lineHeight: '20px' }}>
          {productInfo?.[row.field as keyof IFullProductInfo] ?? '-'}
        </span>
      </SpaceBetweenDiv>
    ));
  };

  const renderOrganisationDetails = () => {
    return organisationTitles.map((row) => (
      <SpaceBetweenDiv style={{ marginBottom: '12px' }} key={row.field}>
        <span className="row-label card-details" style={{ lineHeight: '20px' }}>
          {row.label}
        </span>
        <span className="row-value singleline card-details" style={{ lineHeight: '20px' }}>
          {productInfo?.[row.field as keyof IFullProductInfo] ?? '-'}
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
    setProductInfo(data ?? ({} as IFullProductInfo));
    const categoriesData = data?.categories as unknown as IValue[];
    if (categoriesData?.length > 0) {
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
      dispatch(productsMicroService.util.resetApiState());
      refetch();
    }
  }, [isUpdateCategoriesSuccess]);

  useEffect(() => {
    if (isGetFullProductSuccess) refreshProducts();
  }, [isGetFullProductSuccess]);

  // When refresh products is called and is finished, reset API and refetch data after 7s
  // 7s was determined to be the time it takes to get the correct values from the search index
  useEffect(() => {
    if (!isRefreshFetching && isRefreshSuccess) {
      setTimeout(() => {
        dispatch(productsApi.util.resetApiState());
        refetchProducts();
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

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
