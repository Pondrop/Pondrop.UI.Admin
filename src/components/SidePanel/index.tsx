import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtTrackOutlined, DescriptionOutlined, Logout, ShoppingCartOutlined, Storefront } from '@mui/icons-material';

import pondrop from 'assets/images/pondrop.png';
import { useAppDispatch } from 'store';
import { setCategoriesFilter, setCategoriesSearchValue } from 'store/api/categories/slice';
import { setProductsFilter, setProductsSearchValue } from 'store/api/products/slice';
import { setStoresFilter, setStoresSearchValue } from 'store/api/stores/slice';

import { StyledButton, PanelWrapper } from './styles';

const SidePanel: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<string>('stores');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleProductsRedirect = () => {
    setCurrentTab('products');
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
    setCurrentTab('stores');
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

  const handleTasksRedirect = () => {
    setCurrentTab('tasks');
    navigate('../tasks', { replace: true });
    dispatch(
      setStoresFilter({
        columnField: '',
        value: [],
        operatorValue: 'isAnyOf',
      }),
    );
  };

  return (
    <PanelWrapper>
      <img data-testid="pondrop-logo" src={pondrop} title="Pondrop" />
      <StyledButton
        data-testid="panel-store-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<Storefront className="store-icon" />}
        disableElevation
        onClick={handleStoresRedirect}
        isActive={currentTab === 'stores'}
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
        isActive={currentTab === 'products'}
      >
        Products
      </StyledButton>
      <StyledButton
        data-testid="panel-tasks-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<ArtTrackOutlined className="task-icon" />}
        disableElevation
        onClick={handleTasksRedirect}
        isActive={currentTab === 'tasks'}
      >
        Submissions
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
