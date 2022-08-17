import { render as testRenderer } from '@testing-library/react';
import { FunctionComponent, ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from 'store';

export const render = (ui: ReactElement) => {
  const TestProviders: FunctionComponent = ({ children }) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>;
  };

  return testRenderer(ui, { wrapper: TestProviders });
};
