import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../mocks/mock-offers';

type State = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
}

const initialState: State = {
  cityName: 'Paris',
  placeCards: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCityName: (state, action: PayloadAction<CityName>) => {
      state.cityName = action.payload;
    },
    setOffers: (state, action: PayloadAction<PlaceCardProps[]>) => {
      state.placeCards = action.payload;
    },
  }
});

const offersReducer = offersSlice.reducer;
const { setCityName, setOffers } = offersSlice.actions;

/*const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityName, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.placeCards = action.payload;
    });
});*/

export {
  initialState,
  offersReducer,
  setCityName,
  setOffers
};


