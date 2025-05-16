import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './hooks';

const selectCityName = (state: RootState) => state.offers.cityName;
const selectPlaceCards = (state: RootState) => state.offers.placeCards;
const selectCurrentOffer = (state: RootState) => state.offers.currentOffer;
const selectLoadingStatus = (state: RootState) => state.offers.isLoading;
const selectErrorStatus = (state: RootState) => state.offers.error;

const selectCityPlaceCards = createSelector(
  [selectPlaceCards, selectCityName],
  (placeCards, cityName) => placeCards.filter((card) => card.city?.name === cityName)
);

export {
  selectCityName,
  selectPlaceCards,
  selectCurrentOffer,
  selectLoadingStatus,
  selectErrorStatus,
  selectCityPlaceCards
};
