import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../mocks/mock-offers';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../const';

type OffersState = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
  currentOffer: PlaceCardProps | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  cityName: 'Paris',
  placeCards: [],
  currentOffer: null,
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

const fetchOfferById = createAsyncThunk<PlaceCardProps, string, { extra: AxiosInstance }>(
  'offers/fetchById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<PlaceCardProps>(`${ApiRoute.Offers}/${offerId}`);
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
    clearCurrentOffer: (state) => {
      state.currentOffer = null;
    }
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
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        //state.error = action.error.message || 'Failed to load offers';
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        //state.error = action.error.message || 'Failed to load offer details';
        state.isLoading = false;
      });
  }
});

const offersReducer = offersSlice.reducer;
const { setCityName, clearCurrentOffer } = offersSlice.actions;

export {
  offersReducer,
  setCityName,
  clearCurrentOffer,
  fetchOffers,
  fetchOfferById
};


