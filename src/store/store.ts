import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { setOffers } from './action';
import { placeCards } from '../mocks/mock-offers';

const store = configureStore({ reducer });

store.dispatch(setOffers(placeCards));

export { store };

