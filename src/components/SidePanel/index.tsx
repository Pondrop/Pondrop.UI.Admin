import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CenterFocusStrongOutlined,
  FactCheckOutlined,
  FormatListBulletedOutlined,
  Logout,
  ShoppingCartOutlined,
  Storefront,
} from '@mui/icons-material';

// Assets
import pondrop from 'assets/images/pondrop.png';

// Components
import {
  campaignsColumns,
  productColumns,
  storeColumns,
  tasksColumns,
  templatesColumns,
} from 'components/Grid/constants';

// Store / APIs
import { useAppDispatch } from 'store';
import { setCampaignsFilter, setCampaignsSearchValue } from 'store/api/campaigns/slice';
import { setProductsFilter, setProductsSearchValue } from 'store/api/products/slice';
import { setStoresFilter, setStoresSearchValue } from 'store/api/stores/slice';
import { setTasksFilter, setTasksSearchValue } from 'store/api/tasks/slice';
import { setTemplatesFilter, setTemplatesSearchValue } from 'store/api/templates/slice';

// Styles
import { StyledButton, PanelWrapper } from './styles';

// Utils
import { generateFilterInitState } from 'components/GridMenu/utils';

const SidePanel: FunctionComponent = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<string>('stores');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  // Retain button state based on current location path
  useEffect(() => {
    const currLoc = location.pathname.split('/');
    if (currLoc[1] === 'campaigns') setCurrentTab('campaigns');
    else if (currLoc[1] === 'products' || currLoc[1] === 'categories') setCurrentTab('products');
    else if (currLoc[1] === 'stores') setCurrentTab('stores');
    else if (currLoc[1] === 'submissions') setCurrentTab('submissions');
    else if (currLoc[1] === 'templates') setCurrentTab('templates');
  }, [location]);

  const handleCampaignsRedirect = () => {
    const campaignsFilterInitState = generateFilterInitState(campaignsColumns);
    setCurrentTab('campaigns');
    navigate('../campaigns', { replace: true });
    dispatch(setCampaignsFilter(campaignsFilterInitState));
    dispatch(setCampaignsSearchValue(''));
  };

  const handleProductsRedirect = () => {
    const productFilterInitState = generateFilterInitState(productColumns);
    setCurrentTab('products');
    navigate('../products', { replace: true });
    dispatch(setProductsFilter(productFilterInitState));
    dispatch(setProductsSearchValue(''));
  };

  const handleStoresRedirect = () => {
    const storeFilterInitState = generateFilterInitState(storeColumns);
    setCurrentTab('stores');
    navigate('../stores', { replace: true });
    dispatch(setStoresFilter(storeFilterInitState));
    dispatch(setStoresSearchValue(''));
  };

  const handleTasksRedirect = () => {
    const taskFilterInitState = generateFilterInitState(tasksColumns);
    setCurrentTab('submissions');
    navigate('../submissions', { replace: true });
    dispatch(setTasksFilter(taskFilterInitState));
    dispatch(setTasksSearchValue(''));
  };

  const handleTemplatesRedirect = () => {
    const templateFilterInitState = generateFilterInitState(templatesColumns);
    setCurrentTab('templates');
    navigate('../templates', { replace: true });
    dispatch(setTemplatesFilter(templateFilterInitState));
    dispatch(setTemplatesSearchValue(''));
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
        data-testid="panel-campaigns-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<FactCheckOutlined className="campaigns-icon" />}
        disableElevation
        onClick={handleCampaignsRedirect}
        isActive={currentTab === 'campaigns'}
      >
        Campaigns
      </StyledButton>
      <StyledButton
        data-testid="panel-submissions-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<CenterFocusStrongOutlined className="task-icon" />}
        disableElevation
        onClick={handleTasksRedirect}
        isActive={currentTab === 'submissions'}
      >
        Submissions
      </StyledButton>
      <StyledButton
        data-testid="panel-templates-btn"
        className="panel-btn"
        variant="contained"
        size="large"
        startIcon={<FormatListBulletedOutlined className="template-icon" />}
        disableElevation
        onClick={handleTemplatesRedirect}
        isActive={currentTab === 'templates'}
      >
        Templates
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
