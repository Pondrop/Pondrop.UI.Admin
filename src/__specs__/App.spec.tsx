import { render } from 'utils/testUtilities';
import App from '../App';
import GlobalStyles from '../globalStyles';

test('renders App', () => {
  const { getByText } = render(
    <>
      <GlobalStyles />
      <App />
    </>,
  );

  const signoutBtnText = getByText(/Sign out/i);
  expect(signoutBtnText).toBeInTheDocument();

  const updateHeaderTxt = getByText(/updated/i);
  expect(updateHeaderTxt).toBeInTheDocument();
});
