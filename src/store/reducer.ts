import { createReducer } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../mocks/mock-offers';
import { setCityName, setOffers } from './action';

type State = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
}

const initialState: State = {
  cityName: 'Paris',
  placeCards: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityName, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.placeCards = action.payload;
    });
});

export { initialState, reducer };


