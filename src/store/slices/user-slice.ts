import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/user-types';
import { checkUserStatus, loginUser, logoutUser } from '../thunks/user-thunks';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkUserStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      });
  },
  selectors: {
    authStatus: (state) => state.authorizationStatus,
    user: (state) => state.user,
  }
});

const userReducer = userSlice.reducer;
const userActions = {
  ...userSlice.actions,
  checkUserStatus,
  loginUser,
  logoutUser,
};
const userSelectors = userSlice.selectors;

export {
  userReducer,
  userActions,
  userSelectors,
};
