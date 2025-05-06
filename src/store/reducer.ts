import { createReducer } from '@reduxjs/toolkit';
import { CityName } from '../mocks/mock-offers';
import { setCityName } from './action';

type State = {
  cityName: CityName;
}

const initialState: State = {
  cityName: 'Paris',
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCityName, (state, action) => {
    state.cityName = action.payload;
  });
});

export { initialState, reducer };


