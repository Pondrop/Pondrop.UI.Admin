import { ReportOutlined } from '@mui/icons-material';

// Styles
import { EmptyStateWrapper } from './styles';

// Types
import { IEmptyStateProps } from './types';

const CustomEmptyState = ({ height, displayText, withIcon = true }: IEmptyStateProps) => {
  return (
    <EmptyStateWrapper height={height}>
      {withIcon && <ReportOutlined />}
      <span>{displayText}</span>
    </EmptyStateWrapper>
  );
};

export default CustomEmptyState;
