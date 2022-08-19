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
});
