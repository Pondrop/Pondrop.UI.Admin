import { FormatAlignJustifyOutlined, ImageNotSupportedOutlined } from '@mui/icons-material';

import { ColAlignDiv, RowAlignWrapper, SpaceBetweenDiv } from 'pages/styles';
import { IFields, IItemValue, IValueTypes } from 'store/api/tasks/types';
import { ImgWrapper } from './styles';
import { ITaskRowProps, IValueTypeFields } from './types';

const TaskRow = ({ stepData }: ITaskRowProps) => {
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
        {!hasPhoto ? emptyImage : <img src={photoUrl as string} alt={photoLabel} height="125px" width="125px" />}
      </ImgWrapper>
    );
  };

  const renderComment = (value: string | null) => {
    const hasComment = !!value;

    if (!hasComment) return undefined;

    return <i style={{ marginRight: '2px' }}>"{value}"</i>;
  };

  const renderValues = (isComment: boolean, fieldValue: string | number | IItemValue | null) => {
    if (!fieldValue || !isComment) {
      return (
        <span className="row-value singleline">{fieldValue ?? <i style={{ marginRight: '2px' }}>Not supplied</i>}</span>
      );
    } else if (isComment) {
      return (
        <span className="row-value multiline" style={{ maxWidth: '300px', textAlign: 'right' }}>
          {renderComment(fieldValue as string)}
        </span>
      );
    }
  };

  const renderField = (step: IFields) => {
    const isComment = step.type === 'multilineText';
    const isCurrency = step.type === 'currency';
    const isProduct = step.type === 'search';

    let fieldValue =
      step?.values[0]?.[IValueTypeFields[step?.type as keyof typeof IValueTypeFields] as keyof IValueTypes];

    if (isCurrency) fieldValue = '$ ' + Number(fieldValue).toFixed(2);
    else if (isProduct) fieldValue = (fieldValue as IItemValue)?.itemName;

    return (
      <SpaceBetweenDiv key={step.id} style={{ width: '400px' }}>
        <span className="row-label">{step.label === 'Add a product' ? 'Product' : step.label}</span>
        {renderValues(isComment, fieldValue)}
      </SpaceBetweenDiv>
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
    <RowAlignWrapper style={{ borderTop: '1px solid rgba(224, 224, 224, 1)', padding: '10px 0' }}>
      {renderImage()}
      <ColAlignDiv style={{ alignSelf: 'center' }}>{renderData()}</ColAlignDiv>
    </RowAlignWrapper>
  );
};

export default TaskRow;
