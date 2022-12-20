import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, FormatAlignJustifyOutlined, ImageNotSupportedOutlined } from '@mui/icons-material';
import { Alert, CircularProgress, IconButton, Snackbar } from '@mui/material';
import moment from 'moment';

// Components
import AddProductDialog from 'components/AddProductDialog';
import Chips from 'components/Chips';
import UpdateCategoriesDialog from 'components/UpdateCategoriesDialog';
import EnlargedImageDialog from '../EnlargedImage';

// Store / APIs
import { useAppDispatch, useAppSelector } from 'store';
import {
  productsApi,
  useAddProductMutation,
  useLazyCheckIsProductExistingQuery,
  useLazyGetFullProductInfoQuery,
  useLazyGetProductsQuery,
  useLazyRefreshProductsQuery,
} from 'store/api/products/api';
import { selectProducts } from 'store/api/products/slice';

// Styles
import {
  CategoryBtnWrapper,
  CircularLoaderWrapper,
  ColAlignDiv,
  RowAlignWrapper,
  SpaceBetweenDiv,
  StyledCategoryBtn,
  StyledChipWrapper,
} from 'pages/styles';
import { ImgWrapper } from './styles';

// Types
import { IProductDialogData } from 'store/api/products/types';
import { IFields, IItemValue, IValueTypes } from 'store/api/tasks/types';
import { IValue } from 'store/api/types';
import { IAddProductInitialValues, IFieldLabels, IManualChecker, ITaskRowProps, IValueTypeFields } from './types';

const TaskRow = ({ stepData, categoryFocus }: ITaskRowProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  // Enlarged Image modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Add Product modal
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
  // Update Category modal
  const [isUpdateCategModalOpen, setIsUpdateCategModalOpen] = useState<boolean>(false);
  const [currCategories, setCurrCategories] = useState<string[]>([]);
  const [currCategoriesChips, setCurrCategoriesChips] = useState<IValue[]>([]);
  const [addProductInitialValues, setAddProductInitialValues] = useState<IAddProductInitialValues>(
    {} as IAddProductInitialValues,
  );
  // Keeps track of manually added producrs
  const [manualTracker, setManualTracker] = useState<IManualChecker[]>([]);
  const [isFetchingUpdates, setIsFetchingUpdates] = useState<boolean>(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState<boolean>(false);

  const [
    addProduct,
    {
      data: addProductResponse,
      isSuccess: isAddProductSuccess,
      error: addProductError,
      reset: resetAddProduct,
      isLoading: isAddProductLoading,
    },
  ] = useAddProductMutation();

  const [refreshProducts, { isFetching: isRefreshFetching, isSuccess: isRefreshSuccess }] =
    useLazyRefreshProductsQuery();

  const [
    getFullProductData,
    { data: fullProductData, isFetching: isGetFullProductFetching, isSuccess: isGetFullProductSuccess },
  ] = useLazyGetFullProductInfoQuery();

  const [
    checkProduct,
    { data: checkProductData, isFetching: isCheckProductFetching, isSuccess: isCheckProductSuccess },
  ] = useLazyCheckIsProductExistingQuery();

  const {
    filterItem,
    searchValue = '',
    selectedCategories = [],
    selectedParent,
    sortValue,
  } = useAppSelector(selectProducts);
  const [refetchProducts] = useLazyGetProductsQuery();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleAddProductModalClose = () => {
    setIsAddProductModalOpen(false);
    setErrMsg('');
  };

  const handleAddProductModalOpen = (initialValues: IAddProductInitialValues) => () => {
    setAddProductInitialValues(initialValues);
    setIsAddProductModalOpen(true);
  };

  const handleUpdateCategModalClose = () => {
    setIsUpdateCategModalOpen(false);
    setCurrCategories([]);
    setCurrCategoriesChips([]);
  };

  const handleUpdateCategModalOpen = () => {
    setIsUpdateCategModalOpen(true);
  };

  const handleAddProductSubmit = (productData: IProductDialogData) => {
    addProduct({ ...productData, publicationLifecycleId: '1' });
  };

  const handleUpdateCategSubmit = (newCategories: string[]) => {
    // Insert submit code here
    handleUpdateCategModalClose();
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    resetAddProduct();
  };

  // Loader shown when fetching API response
  const renderLoader = (height: number) => (
    <CircularLoaderWrapper height={`${height}px`}>
      <CircularProgress size={height / 2} thickness={3} />
    </CircularLoaderWrapper>
  );

  const renderImage = () => {
    const hasPhoto = !!stepData?.fields[0]?.values[0]?.photoUrl;
    const photoUrl = stepData?.fields[0]?.values[0]?.photoUrl;
    const photoLabel = stepData?.fields[0]?.label;

    const emptyImage =
      stepData?.fields[0]?.type === 'photo' ? (
        <ImageNotSupportedOutlined sx={{ height: '125px', width: '125px' }} />
      ) : (
        <FormatAlignJustifyOutlined sx={{ height: '125px', width: '125px' }} />
      );

    return (
      <ImgWrapper>
        {!hasPhoto ? (
          emptyImage
        ) : (
          <>
            <img src={photoUrl as string} alt={photoLabel} height="125px" width="125px" onClick={handleModalOpen} />
            <EnlargedImageDialog
              isOpen={isModalOpen}
              handleClose={handleModalClose}
              imageUrl={photoUrl ?? ''}
              altLabel={photoLabel ?? ''}
            />
          </>
        )}
      </ImgWrapper>
    );
  };

  const renderComment = (value: string | null) => {
    const hasComment = !!value;

    if (!hasComment) return undefined;

    return <i style={{ marginRight: '2px' }}>"{value}"</i>;
  };

  const renderProductButton = (rowValue: IValueTypes) => {
    const manualProduct = manualTracker.find((product) => product.name === rowValue?.itemValue?.itemName);
    if (!rowValue?.itemValue?.itemId && !manualProduct?.isAdded) {
      const categoryFocusValue = [
        {
          categoryName: categoryFocus?.itemName ?? '',
          id: categoryFocus?.itemId ?? '',
          lowerLevelCategoryId: categoryFocus?.itemId ?? '',
        },
      ];

      const initialValue = {
        name: rowValue?.itemValue?.itemName ?? '',
        barcodeNumber: rowValue?.itemValue?.itemBarcode ?? '',
        categoryIds: [categoryFocus?.itemId ?? ''],
        categoryChips: categoryFocusValue,
      };
      return (
        <CategoryBtnWrapper rightmargin={0} key={`${rowValue?.itemValue?.itemId}-add-button`}>
          <StyledCategoryBtn
            data-testid="add-product-btn"
            className="add-product-btn"
            variant="contained"
            disableElevation
            height={28}
            style={{ fontSize: '12px' }}
            onClick={handleAddProductModalOpen(initialValue)}
          >
            + Add product
          </StyledCategoryBtn>
        </CategoryBtnWrapper>
      );
    } else if (!rowValue?.itemValue?.itemId && manualProduct?.isAdded) {
      const handleEditClick = () => {
        getFullProductData({ productId: manualProduct.id });
        handleUpdateCategModalOpen();
      };
      return (
        <IconButton className="edit-icon" aria-label="edit" size="small" onClick={handleEditClick}>
          <EditOutlined fontSize="inherit" />
        </IconButton>
      );
    } else return null;
  };

  const renderText = (itemValue: IItemValue, currIndex: number, totalProducts: number) => {
    if (itemValue?.itemId) {
      const handleClick = () => {
        navigate(`/products/${itemValue?.itemId}`);
      };
      return (
        <span className="link" onClick={handleClick} style={{ color: '#000000' }}>
          {itemValue?.itemName}
        </span>
      );
    } else {
      if (manualTracker.length === totalProducts && manualTracker[currIndex]?.isAdded) {
        const handleClick = () => {
          navigate(`/products/${manualTracker[currIndex]?.id}`);
        };

        return (
          <span className="link" onClick={handleClick} style={{ color: '#000000' }}>
            {`${itemValue?.itemName}, ${itemValue?.itemBarcode} (Manual)`}
          </span>
        );
      }
      return <span style={{ color: '#000000' }}>{`${itemValue?.itemName}, ${itemValue?.itemBarcode} (Manual)`}</span>;
    }
  };

  const renderValues = (
    isComment: boolean,
    isProduct: boolean,
    fieldValue: string | number | IItemValue | IValueTypes[] | null | undefined,
    focusData: IItemValue | null,
  ) => {
    if (isProduct && !isFetchingUpdates) {
      return (
        <ul
          className="row-value"
          style={{ listStyle: 'none', paddingInlineStart: '0', flex: '1', fontSize: '14px', lineHeight: '32px' }}
        >
          {Array.isArray(fieldValue) &&
            fieldValue?.map(
              (value, index) =>
                value.itemValue?.itemName && (
                  <SpaceBetweenDiv withmargin={false} key={`${stepData?.id}-${index}`}>
                    <li className="row-value">{renderText(value.itemValue, index, fieldValue.length)}</li>
                    {renderProductButton(value)}
                  </SpaceBetweenDiv>
                ),
            )}
        </ul>
      );
    } else if ((isProduct && isFetchingUpdates) || isCheckProductFetching) {
      const loaderHeight = Array.isArray(fieldValue) ? fieldValue?.length * 32 + 28 : 0;
      return renderLoader(loaderHeight);
    } else if (focusData?.itemId && focusData?.itemType === 'category') {
      const handleChipClick = () => {
        navigate(`/products/categories/${focusData?.itemId}`);
      };

      return (
        <StyledChipWrapper>
          <Chips key={focusData?.itemId} label={focusData?.itemName} onChipClick={handleChipClick} />
        </StyledChipWrapper>
      );
    } else if (!fieldValue || !isComment) {
      return (
        <span className="row-value singleline" style={{ width: '500px' }}>
          {fieldValue ?? <i style={{ marginRight: '2px' }}>Not supplied</i>}
        </span>
      );
    } else if (isComment) {
      return (
        <span className="row-value multiline" style={{ maxWidth: '498px' }}>
          {renderComment(fieldValue as string)}
        </span>
      );
    }
  };

  const renderField = (step: IFields) => {
    const isComment = step.type === 'multilineText';
    const isCurrency = step.type === 'currency';
    const isDate = step.type === 'date';
    const isProduct = step.type === 'search';
    const isFocus = step.type === 'focus';
    const focusData = isFocus ? step?.values[0]?.itemValue : null;

    let fieldValue;

    if (isFocus) {
      fieldValue = step?.values[0]?.itemValue?.itemName;
    } else if (isProduct) fieldValue = step?.values;
    else
      fieldValue =
        step?.values[0]?.[IValueTypeFields[step?.type as keyof typeof IValueTypeFields] as keyof IValueTypes];

    if (isCurrency) fieldValue = '$ ' + Number(fieldValue).toFixed(2);
    if (isDate) fieldValue = fieldValue ? moment(String(fieldValue)).format('DD/MM/YYYY') : null;

    return (
      <RowAlignWrapper key={step.id} style={{ alignItems: 'center' }}>
        <span className="row-label">{IFieldLabels[step?.templateFieldId as keyof typeof IFieldLabels]}</span>
        {renderValues(isComment, isProduct, fieldValue, focusData)}
      </RowAlignWrapper>
    );
  };

  const renderData = () => {
    if (!stepData) return;

    const stepValues = stepData?.fields.filter((step) => step.type !== 'photo');
    return stepValues.map((step, index) => {
      if (index !== 0 && stepValues[0].type === 'focus') return;
      return renderField(step);
    });
  };

  const checkForManualProducts = useCallback(async () => {
    const productList = stepData?.fields?.[1]?.values?.slice() ?? [];
    const updatedManualTracker = [];

    for (let i = 0; i < productList.length; i++) {
      const productName = productList[i]?.itemValue?.itemName ?? '';
      updatedManualTracker.push({
        name: productName,
        id: productList[i]?.itemValue?.itemId ?? '',
        isAdded: false,
        isInitialised: false,
      });
      setManualTracker(updatedManualTracker);
    }

    setIsFetchingUpdates(true);

    for (let i = 0; i < productList.length; i++) {
      const productName = productList[i]?.itemValue?.itemName ?? '';
      await checkProduct({ productName });
    }
  }, [stepData]);

  useEffect(() => {
    setIsSnackbarOpen(isAddProductSuccess);
    if (isAddProductSuccess) {
      refreshProducts();
      const updatedManualTracker = manualTracker?.map((product) => {
        if (product.name === addProductResponse?.name)
          return {
            ...product,
            id: addProductResponse?.id,
            isAdded: true,
          };
        else return product;
      });
      setManualTracker(updatedManualTracker);
      handleAddProductModalClose();
    }
  }, [isAddProductSuccess]);

  useEffect(() => {
    if (stepData?.fields?.[1]?.type === 'search') {
      checkForManualProducts();
    }
  }, [stepData]);
  useEffect(() => {
    if (!isCheckProductFetching && isCheckProductSuccess) {
      const updatedManualTracker = manualTracker.map((product, index) => {
        if (checkProductData !== null && checkProductData?.name === product.name && !product.isInitialised) {
          return {
            ...product,
            id: checkProductData?.id,
            isAdded: true,
            isInitialised: true,
          };
        } else if (
          (index > 0 && manualTracker[index - 1]?.isInitialised && !product.isInitialised) ||
          (index === 0 && !product.isInitialised)
        )
          return {
            ...product,
            isInitialised: true,
          };
        else return product;
      });
      if (updatedManualTracker[updatedManualTracker.length - 1].isInitialised) setIsFetchingUpdates(false);
      setManualTracker(updatedManualTracker);
    }
  }, [isCheckProductFetching, isCheckProductSuccess, checkProductData]);

  useEffect(() => {
    if (addProductError && 'data' in addProductError) setErrMsg(String(addProductError?.data));
  }, [addProductError]);

  // When refresh products is called and is finished, reset API and refetch data after 7s
  // 7s was determined to be the time it takes to get the correct values from the search index
  useEffect(() => {
    if (!isRefreshFetching && isRefreshSuccess) {
      setIsFetchingUpdates(true);
      setTimeout(() => {
        dispatch(productsApi.util.resetApiState());
        refetchProducts({
          searchString: searchValue,
          sortValue,
          filterItem,
          prevPageItems: 0,
          pageSize: 20,
          parentCategory: selectedParent,
          selectedCategories,
        });
        setIsFetchingUpdates(false);
      }, 7000);
    }
  }, [isRefreshFetching, isRefreshSuccess]);

  useEffect(() => {
    if (isGetFullProductFetching) setIsFetchingCategories(true);
    if (!isGetFullProductFetching && isGetFullProductSuccess) {
      const tempCategories: string[] = [];
      const categoryChips: IValue[] = [];
      fullProductData?.categories?.forEach((category) => {
        tempCategories.push(String(category.id));
        categoryChips.push(category as unknown as IValue);
      });
      setCurrCategories(tempCategories);
      setCurrCategoriesChips(categoryChips);
      setIsFetchingCategories(false);
    }
  }, [isGetFullProductFetching, isGetFullProductSuccess]);

  return (
    <RowAlignWrapper style={{ borderTop: '1px solid rgba(224, 224, 224, 1)', padding: '10px 0', alignItems: 'center' }}>
      {renderImage()}
      <ColAlignDiv style={{ alignSelf: 'center', flex: '1' }}>{renderData()}</ColAlignDiv>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          Product has been successfully created
        </Alert>
      </Snackbar>
      <AddProductDialog
        id="add-new-product-from-task"
        isOpen={isAddProductModalOpen}
        handleClose={handleAddProductModalClose}
        handleSubmit={handleAddProductSubmit}
        initialValue={addProductInitialValues}
        errorMessage={errMsg}
        isLoading={isAddProductLoading}
      />
      <UpdateCategoriesDialog
        isOpen={isUpdateCategModalOpen}
        handleSubmit={handleUpdateCategSubmit}
        handleClose={handleUpdateCategModalClose}
        categories={currCategories}
        categoryChips={currCategoriesChips}
        isLoading={false}
        isFetchingData={isFetchingCategories}
      />
    </RowAlignWrapper>
  );
};

export default TaskRow;
