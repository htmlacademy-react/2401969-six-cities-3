import { configureStore } from '@reduxjs/toolkit';
import { fetchOffers, offersReducer } from './offers-slice';
import { createAPI } from '../services/api';
import { checkUserStatus, userReduser } from './user-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReduser,
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

