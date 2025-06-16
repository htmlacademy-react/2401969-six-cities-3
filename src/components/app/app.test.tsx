import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import App from './app';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { userSelectors } from '../../store/slices/user-slice';
import type {
  AsyncThunk,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { User } from '../../types/user-types';
import type { PlaceCardProps } from '../../types/offers-types';
import { AppDispatch } from '../../store/types';

// 1. Типы и конфигурация для тестов
type ThunkApiConfig = {
  extra: AxiosInstance;
  state: unknown;
  dispatch: AppDispatch;
  rejectValue: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

// 2. Фабрики для создания моков
const createMockAsyncThunk = <Return, Arg>() => {
  const mock = vi.fn() as unknown as AsyncThunk<Return, Arg, ThunkApiConfig>;
  Object.assign(mock, {
    type: `test/${Math.random().toString(36).substring(7)}`,
    match: vi.fn()
  });
  return mock;
};

const createMockAction = <Payload, Type extends string>(type: Type) => {
  const mock = vi.fn() as unknown as ActionCreatorWithPayload<Payload, Type>;
  Object.assign(mock, { type, match: vi.fn() });
  return mock;
};

const createMockActionWithoutPayload = <Type extends string>(type: Type) => {
  const mock = vi.fn() as unknown as ActionCreatorWithoutPayload<Type>;
  Object.assign(mock, { type, match: vi.fn() });
  return mock;
};

// 3. Моки всех actions
const mockUserActions = {
  checkUserStatus: createMockAsyncThunk<User, undefined>(),
  loginUser: createMockAsyncThunk<User, { email: string; password: string }>(),
  logoutUser: createMockAsyncThunk<void, undefined>(),
};

const mockOffersActions = {
  fetchOffers: createMockAsyncThunk<PlaceCardProps[], undefined>(),
  fetchNearbyOffers: createMockAsyncThunk<PlaceCardProps[], string>(),
  fetchOfferById: createMockAsyncThunk<PlaceCardProps, string>(),
  fetchFavorites: createMockAsyncThunk<PlaceCardProps[], undefined>(),
  toggleFavorite: createMockAsyncThunk<PlaceCardProps, { id: string; status: boolean }>(),
  setCityName: createMockAction<string, 'offers/setCityName'>('offers/setCityName'),
  clearNearbyOffers: createMockActionWithoutPayload<'offers/clearNearbyOffers'>('offers/clearNearbyOffers'),
  clearFavorites: createMockActionWithoutPayload<'offers/clearFavorites'>('offers/clearFavorites'),
};

// 4. Моки компонентов
vi.mock('../../pages/main-page/main-page', () => ({
  MainPage: () => <div>MainPage</div>
}));

vi.mock('../../pages/favorites-page/favorites-page', () => ({
  FavoritesPage: () => <div>FavoritesPage</div>
}));

vi.mock('../../pages/login-page/login-page', () => ({
  LoginPage: () => <div>LoginPage</div>
}));

vi.mock('../../pages/offer-page/offer-page', () => ({
  OfferPage: () => <div>OfferPage</div>
}));

vi.mock('../../pages/not-found-page/not-found-page', () => ({
  NotFoundPage: () => <div>NotFoundPage</div>
}));

vi.mock('../../pages/loading-page/loading-page', () => ({
  LoadingPage: () => <div>LoadingPage</div>
}));

vi.mock('../private-route/private-route', () => ({
  PrivateRoute: ({ children }: { children: JSX.Element }) => children
}));

// 5. Моки Redux store
vi.mock('../../store/hooks', () => ({
  useAppSelector: vi.fn(),
  useOffersActions: vi.fn(() => mockOffersActions),
  useUserActions: vi.fn(() => mockUserActions),
}));

// 6. Основные тесты
describe('App component', () => {
  beforeEach(() => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === userSelectors.authStatus) {
        return AuthorizationStatus.Auth;
      }
      return undefined;
    });
    vi.clearAllMocks();
  });

  it('should initialize auth and load offers on mount', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(mockUserActions.checkUserStatus).toHaveBeenCalled();
    expect(mockOffersActions.fetchOffers).toHaveBeenCalled();
    expect(mockOffersActions.fetchFavorites).toHaveBeenCalled();
  });

  it('should show loading state when auth status is unknown', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === userSelectors.authStatus) {
        return AuthorizationStatus.Unknown;
      }
      return undefined;
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('LoadingPage')).toBeInTheDocument();
  });

  it('should render offer page for offer route', () => {
    render(
      <MemoryRouter initialEntries={[`${AppRoute.Offers}/1`]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('OfferPage')).toBeInTheDocument();
  });
});
