import { describe, it, expect } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/user-types';
import { userReducer, userSelectors } from './user-slice';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const mockUser: User = {
  email: 'test@example.com',
  token: 'test-token',
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.jpg',
  isPro: false,
};

describe('user-slice', () => {
  const initialState: UserState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  describe('reducers', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = userReducer(undefined, emptyAction);
      expect(result).toEqual(initialState);
    });

    it('should not modify state on unknown action', () => {
      const state = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUser,
      };
      const emptyAction = { type: 'unknown_action' };
      const result = userReducer(state, emptyAction);
      expect(result).toEqual(state);
    });
  });

  describe('selectors', () => {
    it('should return auth status', () => {
      const state = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
      };
      expect(userSelectors.authStatus.unwrapped(state)).toBe(AuthorizationStatus.Auth);
    });

    it('should return user data', () => {
      const state = {
        ...initialState,
        user: mockUser,
      };
      expect(userSelectors.user.unwrapped(state)).toEqual(mockUser);
    });

    it('should return null if user is not loaded', () => {
      const state = {
        ...initialState,
        user: null,
      };
      expect(userSelectors.user.unwrapped(state)).toBeNull();
    });
  });
});
