import userEvent from '@testing-library/user-event';

import { render } from 'utils/testUtilities';
import { screen } from '@testing-library/dom';
import App from '../App';
import GlobalStyles from '../globalStyles';

describe('<App />', () => {
  const renderApp = () =>
    render(
      <>
        <GlobalStyles />
        <App />
      </>,
    );

  const changeJSDOMURL = (url: string) => {
    const newURL = new URL(url);
    const href = `${window.origin}${newURL.pathname}${newURL.search}${newURL.hash}`;
    history.replaceState(history.state, '', href);
  };
  test('should render App', () => {
    const { getByText } = renderApp();

    const signoutBtnText = getByText(/Sign out/i);
    expect(signoutBtnText).toBeInTheDocument();

    const updateHeaderTxt = getByText(/updated/i);
    expect(updateHeaderTxt).toBeInTheDocument();
  });

  test('should show Stores page', async () => {
    const { findByTestId, getByTestId } = renderApp();
    const user = userEvent.setup();

    const storeBtn = await findByTestId('panel-store-btn');

    await user.click(storeBtn);

    const storesTitle = getByTestId('stores-header');
    expect(storesTitle).toBeInTheDocument();
  });

  test('should show Products page', async () => {
    const { findByTestId, getByTestId } = renderApp();
    const user = userEvent.setup();

    const productBtn = await findByTestId('panel-product-btn');

    await user.click(productBtn);

    const productsTitle = getByTestId('products-header');
    expect(productsTitle).toBeInTheDocument();
  });

  test('should show Categories page', async () => {
    const { findByTestId, getByTestId } = renderApp();
    const user = userEvent.setup();

    const categoryBtn = await findByTestId('panel-category-btn');

    await user.click(categoryBtn);

    const categoryTitle = getByTestId('categories-header');
    expect(categoryTitle).toBeInTheDocument();
  });

  test('should show Add Category modal', async () => {
    const { findByTestId, getByTestId } = renderApp();
    const user = userEvent.setup();

    const categoryBtn = await findByTestId('panel-category-btn');

    await user.click(categoryBtn);

    const categoryTitle = getByTestId('categories-header');
    expect(categoryTitle).toBeInTheDocument();

    const addCategoryBtn = getByTestId('add-category-btn');

    await user.click(addCategoryBtn);

    const categoryModal = screen.getByTestId('add-category-modal');
    expect(categoryModal).toBeInTheDocument();
  });

  test('should show Store Details page', async () => {
    changeJSDOMURL('http://localhost:3000/stores/76de546d-ed74-40ad-80d4-226b784ad001');
    const { findByTestId } = renderApp();

    const storeHeader = await findByTestId('stores-link');
    expect(storeHeader).toBeInTheDocument();
  });

  test('should show Product Details page', async () => {
    changeJSDOMURL('http://localhost:3000/products/368b1712-e017-ed11-ae83-38563d96d24c');
    const { findByTestId } = renderApp();

    const productHeader = await findByTestId('products-link');
    expect(productHeader).toBeInTheDocument();
  });

  test('should show Category Details page', async () => {
    changeJSDOMURL('http://localhost:3000/categories/48634be1-b1e4-4071-ad86-60730281f44a');
    const { findByTestId } = renderApp();

    const categoryHeader = await findByTestId('categories-link');
    expect(categoryHeader).toBeInTheDocument();
  });
});
