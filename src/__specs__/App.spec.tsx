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

  // test('should display Grid menu', async () => {
  //   const { container, getByText } = renderApp();

  //   const providerHeader = getByText('Provider');
  //   await userEvent.hover(providerHeader);
  //   const filterBtn = container.getElementsByClassName('MuiDataGrid-menuIconButton');
  //   //console.log(filterBtn[0]);
  //   await userEvent.click(filterBtn[0]);
  //   const menuList = container.getElementsByClassName('MuiFormControlLabel-root');
  //   expect(menuList).toHaveLength(1);
  // });
});
