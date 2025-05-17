import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './hooks';

const selectCityName = (state: RootState) => state.offers.cityName;
const selectPlaceCards = (state: RootState) => state.offers.placeCards;
const selectNearbyCards = (state: RootState) => state.offers.nearbyCards;
const selectOfferCard = (state: RootState) => state.offers.offerCard;
const selectLoadingStatus = (state: RootState) => state.offers.isLoading;
const selectNearbyLoadingStatus = (state: RootState) => state.offers.isNearbyLoading;
const selectErrorStatus = (state: RootState) => state.offers.error;

const selectCityPlaceCards = createSelector(
  [selectPlaceCards, selectCityName],
  (placeCards, cityName) => placeCards.filter((card) => card.city?.name === cityName)
);

const selectOfferPageData = createSelector(
  [selectOfferCard, selectNearbyCards, selectLoadingStatus, selectNearbyLoadingStatus],
  (offerCard, nearbyCards, isLoading, isNearbyLoading) => ({offerCard, nearbyCards, isLoading, isNearbyLoading})
);

export {
  selectCityName,
  selectErrorStatus,
  selectLoadingStatus,
  selectCityPlaceCards,
  selectOfferPageData
};
