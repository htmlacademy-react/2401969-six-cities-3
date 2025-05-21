import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../../types/offers-types';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';

type OffersState = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
  nearbyCards: PlaceCardProps[];
  offerCard: PlaceCardProps | null;
  isLoading: boolean;
  isNearbyLoading: boolean;
}

const initialState: OffersState = {
  cityName: 'Paris',
  placeCards: [],
  nearbyCards: [],
  offerCard: null,
  isLoading: false,
  isNearbyLoading: false,
};

const fetchOffers = createAsyncThunk<PlaceCardProps[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async(_, { extra: api }) => {
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

const fetchNearbyOffers = createAsyncThunk<PlaceCardProps[], string, { extra: AxiosInstance }>(
  'offers/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<PlaceCardProps[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
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
      state.offerCard = null;
    },
    clearNearbyOffers: (state) => {
      state.nearbyCards = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.placeCards = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearbyLoading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.isNearbyLoading = false;
        state.nearbyCards = action.payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isNearbyLoading = false;
        //state.error = action.error.message || 'Failed to load offers';
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.offerCard = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        //state.error = action.error.message || 'Failed to load offer details';
        state.isLoading = false;
      });
  }
});

const offersReducer = offersSlice.reducer;
const { setCityName, clearCurrentOffer, clearNearbyOffers } = offersSlice.actions;

export {
  offersReducer,
  setCityName,
  clearCurrentOffer,
  clearNearbyOffers,
  fetchOffers,
  fetchNearbyOffers,
  fetchOfferById
};


