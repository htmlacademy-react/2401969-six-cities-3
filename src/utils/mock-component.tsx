import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../store/slices/user-slice';
import { offersReducer } from '../store/slices/offers-slice';
import { commentsReducer } from '../store/slices/comments-slice';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
//import { AppThunkDispatch } from '../store/types';

/*type TestStore = ReturnType<typeof createTestStore> & {
  dispatch: AppThunkDispatch;
};*/

type CustomRenderOptions = {
  preloadedState?: Record<string, unknown>;
  routerProps?: MemoryRouterProps;
} & Omit<RenderOptions, 'wrapper'>;

const api = createAPI();
const mockAxios = new MockAdapter(api);


const createTestStore = (preloadedState = {}) => configureStore({
  reducer: {
    user: userReducer,
    offers: offersReducer,
    comments: commentsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api }
    }),
  preloadedState
});

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    routerProps = {},
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const store = createTestStore(preloadedState);

  const Wrapper = ({ children }: { children: ReactElement }) => (
    <Provider store={store}>
      <MemoryRouter {...routerProps}>
        {children}
      </MemoryRouter>
    </Provider>
  );

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    ...renderResult,
    store,
    mockAxios,
    api // Добавляем store в возвращаемый объект
  };
};
