import { ReportOutlined } from '@mui/icons-material';

import { EmptyStateWrapper } from './styles';

const CustomGridEmptyState = () => {
  return (
    <EmptyStateWrapper>
      <ReportOutlined />
      <span>No matches found.</span>
    </EmptyStateWrapper>
  );
};

export default CustomGridEmptyState;
