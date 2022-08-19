import { FunctionComponent } from 'react';
import { ShoppingCartOutlined, Logout, Storefront } from '@mui/icons-material';

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
      <img data-testid="pondrop-logo" src={pondrop} onClick={handleRefresh} />
      <StyledButton
        data-testid="panel-store-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<Storefront className="start-icon" />}
        disableElevation
        onClick={handleRefresh}
      >
        Stores
      </StyledButton>
      <StyledButton
        data-testid="panel-product-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<ShoppingCartOutlined className="product-icon" />}
        disableElevation
        onClick={handleRefresh}
      >
        Products
      </StyledButton>
      <StyledButton
        data-testid="signout-btn"
        className="signout-btn"
        size="large"
        startIcon={<Logout className="signout-icon" />}
      >
        Sign out
      </StyledButton>
    </PanelWrapper>
  );
};

export default SidePanel;
