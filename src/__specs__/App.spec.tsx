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

    const productBtn = await findByTestId('panel-product-btn');

    await user.click(productBtn);

    const productsTitle = getByTestId('products-header');
    expect(productsTitle).toBeInTheDocument();

    const manageCategBtn = await findByTestId('manage-categories-btn');

    await user.click(manageCategBtn);

    const categoriesTitle = getByTestId('categories-header');
    expect(categoriesTitle).toBeInTheDocument();
  });

  test('should show Submissions page', async () => {
    const { findByTestId, getByTestId } = renderApp();
    const user = userEvent.setup();

    const submissionsBtn = await findByTestId('panel-submissions-btn');

    await user.click(submissionsBtn);

    const submissionsTitle = getByTestId('submissons-header');
    expect(submissionsTitle).toBeInTheDocument();
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

  test('should show Submission Details page', async () => {
    changeJSDOMURL('http://localhost:3000/submissions/fe3c91a8-d08d-4591-8da9-8a1ba5accafb');
    const { findByTestId } = renderApp();

    const submissionsHeader = await findByTestId('submissions-link');
    expect(submissionsHeader).toBeInTheDocument();
  });
});
