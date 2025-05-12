import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../mocks/mock-offers';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../const';

type OffersState = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  cityName: 'Paris',
  placeCards: [],
  isLoading: false,
  error: null,
};

const fetchOffers = createAsyncThunk<PlaceCardProps[],undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async(_, { extra: api}) => {
    const {data} = await api.get<PlaceCardProps[]>(ApiRoute.Offers);
    return data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCityName: (state, action: PayloadAction<CityName>) => {
      state.cityName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.placeCards = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load offers';
      });
  }
});

const offersReducer = offersSlice.reducer;
const { setCityName } = offersSlice.actions;

export {
  offersReducer,
  setCityName,
  fetchOffers,
};


