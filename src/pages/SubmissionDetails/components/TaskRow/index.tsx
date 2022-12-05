import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormatAlignJustifyOutlined, ImageNotSupportedOutlined } from '@mui/icons-material';
import moment from 'moment';

// Components
import AddProductDialog from 'components/AddProductDialog';
import Chips from 'components/Chips';
import { StyledChipWrapper } from 'components/Grid/styles';

import { CategoryBtnWrapper, ColAlignDiv, RowAlignWrapper, SpaceBetweenDiv, StyledCategoryBtn } from 'pages/styles';
import { IProductDialogData } from 'store/api/products/types';
import { IFields, IItemValue, IValueTypes } from 'store/api/tasks/types';
import EnlargedImageDialog from '../EnlargedImage';
import { ImgWrapper } from './styles';
import { IAddProductInitialValues, IFieldLabels, ITaskRowProps, IValueTypeFields } from './types';

const TaskRow = ({ stepData, categoryFocus }: ITaskRowProps) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
  const [addProductInitialValues, setAddProductInitialValues] = useState<IAddProductInitialValues>(
    {} as IAddProductInitialValues,
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleAddProductModalClose = () => {
    setIsAddProductModalOpen(false);
  };

  const handleAddProductModalOpen = (initialValues: IAddProductInitialValues) => () => {
    setAddProductInitialValues(initialValues);
    setIsAddProductModalOpen(true);
  };

  const handleAddProductSubmit = (productData: IProductDialogData) => {
    // Insert submit code here
    console.log('product data ', productData);
    setIsAddProductModalOpen(false);
  };

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
    if (!rowValue?.itemValue?.itemId) {
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
    } else return null;
  };

  const renderValues = (
    isComment: boolean,
    isProduct: boolean,
    fieldValue: string | number | IItemValue | IValueTypes[] | null | undefined,
    focusData: IItemValue | null,
  ) => {
    if (isProduct) {
      return (
        <ul
          className="row-value"
          style={{ listStyle: 'none', paddingInlineStart: '0', flex: '1', fontSize: '14px', lineHeight: '32px' }}
        >
          {Array.isArray(fieldValue) &&
            fieldValue?.map(
              (value) =>
                value.itemValue?.itemName && (
                  <SpaceBetweenDiv withmargin={false}>
                    <li className="row-value" key={`${stepData?.id}-${value.itemValue?.itemId}`}>
                      {`${value.itemValue?.itemName}${
                        value.itemValue?.itemId ? '' : `, ${value.itemValue?.itemBarcode} (Manual)`
                      }`}
                    </li>
                    {renderProductButton(value)}
                  </SpaceBetweenDiv>
                ),
            )}
        </ul>
      );
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
      //if (step?.values[0]?.itemValue) setCategoryFocusData(step?.values[0]?.itemValue);
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
    return stepValues.map((step) => {
      return renderField(step);
    });
  };

  return (
    <RowAlignWrapper style={{ borderTop: '1px solid rgba(224, 224, 224, 1)', padding: '10px 0', alignItems: 'center' }}>
      {renderImage()}
      <ColAlignDiv style={{ alignSelf: 'center', flex: '1' }}>{renderData()}</ColAlignDiv>
      <AddProductDialog
        id="add-new-product-from-task"
        isOpen={isAddProductModalOpen}
        handleClose={handleAddProductModalClose}
        handleSubmit={handleAddProductSubmit}
        initialValue={addProductInitialValues}
        errorMessage={''}
      />
    </RowAlignWrapper>
  );
};

export default TaskRow;
