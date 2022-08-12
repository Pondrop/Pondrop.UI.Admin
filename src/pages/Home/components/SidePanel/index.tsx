import { FunctionComponent } from 'react';
import { Logout, Storefront } from '@mui/icons-material';

import pondrop from 'assets/images/pondrop.png';
import { useGetStoresQuery } from 'store/api/stores/api';

import { StyledButton, PanelWrapper } from './styles';

const SidePanel: FunctionComponent = (): JSX.Element => {
  const { refetch } = useGetStoresQuery();

  const handleRefresh = () => {
    refetch();
    window.location.reload();
  };

  return (
    <PanelWrapper>
      <img src={pondrop} onClick={handleRefresh} />
      <StyledButton
        className="store-btn"
        variant="contained"
        size="large"
        startIcon={<Storefront className="start-icon" />}
        disableElevation
        onClick={handleRefresh}
      >
        Stores
      </StyledButton>
      <StyledButton className="logout-btn" size="large" startIcon={<Logout className="start-icon" />}>
        Sign out
      </StyledButton>
    </PanelWrapper>
  );
};

export default SidePanel;
