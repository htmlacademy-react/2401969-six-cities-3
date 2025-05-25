import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../../types/offers-types';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';

type OffersState = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
  nearbyCards: PlaceCardProps[];
  offerCard: PlaceCardProps | null;
  favoriteCards: PlaceCardProps[];
  isLoading: boolean;
  isNearbyLoading: boolean;
}

const initialState: OffersState = {
  cityName: 'Paris',
  placeCards: [],
  nearbyCards: [],
  offerCard: null,
  favoriteCards: [],
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

const fetchFavorites = createAsyncThunk<PlaceCardProps[], undefined, { extra: AxiosInstance}>(
  'offers/fetchFavorites',
  async (_, { extra: api }) => {
    const { data } = await api.get<PlaceCardProps[]>(ApiRoute.Favorite);
    return data;
  }
);

const toggleFavorite = createAsyncThunk<PlaceCardProps, { offerId: string; status: number }, { extra: AxiosInstance }>(
  'offers/toggleFavorite',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<PlaceCardProps>(`${ApiRoute.Favorite}/${offerId}/${status}`);
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
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.offerCard = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteCards = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.favoriteCards = [];
      })
      .addCase(toggleFavorite.pending, (state, action) => {
        const { offerId, status } = action.meta.arg;
        const card = state.placeCards.find((item) => item.id === offerId);
        if (card) {
          card.isFavorite = status === 1;
        }
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const placeCard = state.placeCards.find((item) => item.id === updatedOffer.id);
        if (placeCard) {
          Object.assign(placeCard, updatedOffer);
        }
        if (state.offerCard?.id === updatedOffer.id) {
          Object.assign(state.offerCard, updatedOffer);
        }
        if (updatedOffer.isFavorite) {
          state.favoriteCards.push(updatedOffer);
        } else {
          state.favoriteCards = state.favoriteCards.filter(
            (item) => item.id !== updatedOffer.id
          );
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        const { offerId, status } = action.meta.arg;
        const card = state.placeCards.find((item) => item.id === offerId);
        if (card) {
          card.isFavorite = status === 0;
        }
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
  fetchOfferById,
  fetchFavorites,
  toggleFavorite,
};


