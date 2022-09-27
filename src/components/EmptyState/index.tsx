import { ReportOutlined } from '@mui/icons-material';

import { EmptyStateWrapper } from './styles';
import { IEmptyStateProps } from './types';

const CustomEmptyState = ({ height, displayText }: IEmptyStateProps) => {
  return (
    <EmptyStateWrapper height={height}>
      <ReportOutlined />
      <span>{displayText}</span>
    </EmptyStateWrapper>
  );
};

export default CustomEmptyState;
