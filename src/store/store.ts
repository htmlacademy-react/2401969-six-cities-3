import { configureStore } from '@reduxjs/toolkit';
import { fetchOffers, offersReducer } from './offers-slice';
import { createAPI } from '../services/api';

const api = createAPI();

const store = configureStore({
  reducer: {
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

store.dispatch(fetchOffers());

export { store };

