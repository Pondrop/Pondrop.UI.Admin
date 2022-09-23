import { ColAlignDiv, RowAlignWrapper, SpaceBetweenDiv } from 'pages/styles';
import { ImgWrapper } from './styles';
import { ITaskRowProps } from './types';

const TaskRow = ({ url, rowData }: ITaskRowProps) => {
  const renderImage = () => {
    return (
      <ImgWrapper>
        <img src={url} alt={url} height="125px" width="125px" />
      </ImgWrapper>
    );
  };

  const renderData = () => {
    return rowData.map((row) => {
      return (
        <SpaceBetweenDiv key={row.field} style={{ width: '250px' }}>
          <span className="row-label">{row.label}</span>
          <span className="row-value singleline">{row.value}</span>
        </SpaceBetweenDiv>
      );
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
