import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../../types/offers-types';
import { fetchFavorites, fetchNearbyOffers, fetchOfferById, fetchOffers, toggleFavorite } from '../thunks/offers-thunks';
import { RequestStatus } from '../../const';

type OffersState = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
  nearbyCards: PlaceCardProps[];
  offerCard: PlaceCardProps | null;
  favoriteCards: PlaceCardProps[];
  status: RequestStatus;
}

const initialState: OffersState = {
  cityName: 'Paris',
  placeCards: [],
  nearbyCards: [],
  offerCard: null,
  favoriteCards: [],
  status: RequestStatus.Idle,
};

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
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.placeCards = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.nearbyCards = action.payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offerCard = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.favoriteCards = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.status = RequestStatus.Failed;
        state.favoriteCards = [];
      })
      .addCase(toggleFavorite.pending, (state, action) => {
        const { offerId, status } = action.meta.arg;
        const placeCard = state.placeCards.find((item) => item.id === offerId);
        if (placeCard) {
          placeCard.isFavorite = status === 1;
        }
        const nearbyCard = state.nearbyCards.find((item) => item.id === offerId);
        if (nearbyCard) {
          nearbyCard.isFavorite = status === 1;
        }
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const placeCard = state.placeCards.find((item) => item.id === updatedOffer.id);
        if (placeCard) {
          Object.assign(placeCard, updatedOffer);
        }
        const nearbyCard = state.nearbyCards.find((item) => item.id === updatedOffer.id);
        if (nearbyCard) {
          Object.assign(nearbyCard, updatedOffer);
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
        const placeCard = state.placeCards.find((item) => item.id === offerId);
        if (placeCard) {
          placeCard.isFavorite = status === 0;
        }
        const nearbyCard = state.nearbyCards.find((item) => item.id === offerId);
        if (nearbyCard) {
          nearbyCard.isFavorite = status === 0;
        }
      });
  },
  selectors: {
    cityName: (state) => state.cityName,
    placeCards: (state) => state.placeCards,
    offerCard: (state) => state.offerCard,
    nearbyCards: (state) => state.nearbyCards,
    favoritesCards: (state) => state.favoriteCards,
    status: (state) => state.status,
  }
});

const offersReducer = offersSlice.reducer;
const offersActions = {
  ...offersSlice.actions,
  fetchOffers,
  fetchNearbyOffers,
  fetchOfferById,
  fetchFavorites,
  toggleFavorite,
};
const offersSelectors = offersSlice.selectors;

export {
  offersReducer,
  offersActions,
  offersSelectors
};


