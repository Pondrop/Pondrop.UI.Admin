import userEvent from '@testing-library/user-event';

import { render } from 'utils/testUtilities';
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

  test('should show Store Details page', async () => {
    const changeJSDOMURL = (url: string) => {
      const newURL = new URL(url);
      const href = `${window.origin}${newURL.pathname}${newURL.search}${newURL.hash}`;
      history.replaceState(history.state, '', href);
    };

    changeJSDOMURL('http://localhost:3000/stores/76de546d-ed74-40ad-80d4-226b784ad001');
    const { findByTestId } = renderApp();

    const storeHeader = await findByTestId('stores-link');
    expect(storeHeader).toBeInTheDocument();
  });
});
