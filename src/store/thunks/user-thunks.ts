import { ApiRoute } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { User, UserAuth } from '../../types/user-types';
import { createAppAsyncThunk } from '../types';

const checkUserStatus = createAppAsyncThunk<User, undefined>(
  'user/checkUserStatus',
  async(_, { extra: api }) => {
    const { data } = await api.get<User>(ApiRoute.Login);
    return data;
  }
);

const loginUser = createAppAsyncThunk<User, UserAuth>(
  'user/loginUser',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);

const logoutUser = createAppAsyncThunk<void, undefined>(
  'user/logoutUser',
  async (_, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

export {
  checkUserStatus,
  loginUser,
  logoutUser,
};
