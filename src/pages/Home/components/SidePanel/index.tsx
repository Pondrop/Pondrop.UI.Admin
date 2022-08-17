import { FunctionComponent } from 'react';
import { Logout, Storefront } from '@mui/icons-material';

import pondrop from 'assets/images/pondrop.png';
import { useAppSelector } from 'store';
import { useGetStoresQuery } from 'store/api/stores/api';
import { selectStore } from 'store/api/stores/slice';

import { StyledButton, PanelWrapper } from './styles';

const SidePanel: FunctionComponent = (): JSX.Element => {
  const { searchValue } = useAppSelector(selectStore);
  const { refetch } = useGetStoresQuery(searchValue);

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
