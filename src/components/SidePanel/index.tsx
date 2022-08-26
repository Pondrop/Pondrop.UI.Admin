import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, Logout, Storefront } from '@mui/icons-material';

import pondrop from 'assets/images/pondrop.png';
import { useAppDispatch } from 'store';
import { setProductsFilter, setProductsSearchValue } from 'store/api/products/slice';
import { setStoresFilter, setStoresSearchValue } from 'store/api/stores/slice';

import { StyledButton, PanelWrapper } from './styles';

const SidePanel: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleProductsRedirect = () => {
    navigate('../products', { replace: true });
    dispatch(
      setProductsFilter({
        columnField: '',
        value: [],
        operatorValue: 'isAnyOf',
      }),
    );
    dispatch(setProductsSearchValue(''));
  };

  const handleStoresRedirect = () => {
    navigate('../stores', { replace: true });
    dispatch(
      setStoresFilter({
        columnField: '',
        value: [],
        operatorValue: 'isAnyOf',
      }),
    );
    dispatch(setStoresSearchValue(''));
  };

  return (
    <PanelWrapper>
      <img data-testid="pondrop-logo" src={pondrop} title="Pondrop" />
      <StyledButton
        data-testid="panel-store-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<Storefront className="start-icon" />}
        disableElevation
        onClick={handleStoresRedirect}
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
        onClick={handleProductsRedirect}
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