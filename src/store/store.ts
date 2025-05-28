import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './slices/offers-slice';
import { createAPI } from '../services/api';
import { userReducer } from './slices/user-slice';
import { commentsReducer } from './slices/comments-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

export { store };

