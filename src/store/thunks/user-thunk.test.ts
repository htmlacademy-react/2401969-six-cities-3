// user-thunks.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { checkUserStatus, loginUser, logoutUser } from './user-thunks';
import { userReducer } from '../slices/user-slice';
import { offersReducer } from '../slices/offers-slice';
import { commentsReducer } from '../slices/comments-slice';
import { ApiRoute, AuthorizationStatus } from '../../const';
import type { User, UserAuth } from '../../types/user-types';
import { AppThunkDispatch, RootState } from '../types';

type TestStore = {
  dispatch: AppThunkDispatch;
  getState: () => RootState;
};

describe('User thunks', () => {
  const api = createAPI();
  const mockAxios = new MockAdapter(api);
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        offers: offersReducer,
        user: userReducer,
        comments: commentsReducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api
          }
        })
    }) as unknown as TestStore;

    mockAxios.reset();
  });

  describe('checkUserStatus', () => {
    it('should handle successful auth', async () => {
      const mockUser: User = {
        name: 'Test User',
        avatarUrl: '/img/avatar.jpg',
        isPro: false,
        email: 'test@test.com',
        token: 'test-token'
      };

      mockAxios.onGet(ApiRoute.Login).reply(200, mockUser);

      await store.dispatch(checkUserStatus());

      expect(store.getState().user.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(store.getState().user.user).toEqual(mockUser);
    });

    it('should handle auth failure', async () => {
      mockAxios.onGet(ApiRoute.Login).reply(401);

      await store.dispatch(checkUserStatus());

      expect(store.getState().user.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
      expect(store.getState().user.user).toBeNull();
    });
  });

  describe('loginUser', () => {
    const testCredentials: UserAuth = {
      email: 'test@test.com',
      password: 'password123'
    };

    it('should update state on successful login', async () => {
      const mockUser: User = {
        name: 'Test User',
        avatarUrl: '/img/avatar.jpg',
        isPro: false,
        email: 'test@test.com',
        token: 'auth-token'
      };

      mockAxios.onPost(ApiRoute.Login, testCredentials).reply(200, mockUser);
      await store.dispatch(loginUser(testCredentials));

      const state = store.getState().user;
      expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(state.user).toEqual(mockUser);
    });

    it('should set NotAuth on login failure', async () => {
      mockAxios.onPost(ApiRoute.Login, testCredentials).reply(401);

      await store.dispatch(loginUser(testCredentials));

      expect(store.getState().user.authorizationStatus)
        .toBe(AuthorizationStatus.NotAuth);
    });
  });

  describe('logoutUser', () => {
    beforeEach(() => {
    // Устанавливаем авторизованное состояние через preloadedState
      const initialState = {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: {
            name: 'Test User',
            avatarUrl: '/img/avatar.jpg',
            isPro: false,
            email: 'test@test.com',
            token: 'valid-token'
          }
        }
      };

      store = configureStore({
        reducer: {
          offers: offersReducer,
          user: userReducer,
          comments: commentsReducer
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: { extraArgument: api }
          }),
        preloadedState: initialState
      }) as unknown as TestStore;
    });

    it('should clear user data on successful logout', async () => {
      mockAxios.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(logoutUser());

      const state = store.getState().user;
      expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
      expect(state.user).toBeNull();
    });

    it('should clear user data even if logout API fails', async () => {
      mockAxios.onDelete(ApiRoute.Logout).networkError();

      await store.dispatch(logoutUser());

      const state = store.getState().user;
      expect(state.authorizationStatus).toBe(AuthorizationStatus.NotAuth);
      expect(state.user).toBeNull();
    });
  });
});

