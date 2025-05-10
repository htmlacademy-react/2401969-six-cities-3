import { configureStore } from '@reduxjs/toolkit';
import { offersReducer, setOffers } from './reducer';
import { placeCards } from '../mocks/mock-offers';

const store = configureStore({
  reducer: offersReducer });

store.dispatch(setOffers(placeCards));

export { store };

