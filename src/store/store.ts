import { configureStore } from '@reduxjs/toolkit';
import { fetchOffers, offersReducer } from './slices/offers-slice';
import { createAPI } from '../services/api';
import { checkUserStatus, userReduser } from './slices/user-slice';
import { commentsReducer } from './slices/comments-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReduser,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

store.dispatch(fetchOffers());
store.dispatch(checkUserStatus());

export { store };

