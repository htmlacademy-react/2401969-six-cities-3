import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './hooks';

const selectCityName = (state: RootState) => state.offers.cityName;
const selectPlaceCards = (state: RootState) => state.offers.placeCards;
const selectNearbyCards = (state: RootState) => state.offers.nearbyCards;
const selectOfferCard = (state: RootState) => state.offers.offerCard;
const selectLoadingStatus = (state: RootState) => state.offers.isLoading;
const selectNearbyLoadingStatus = (state: RootState) => state.offers.isNearbyLoading;
const selectAuthStatus = (state: RootState) => state.user.authorizationStatus;
const selectUser = (state: RootState) => state.user.user;
const selectComments = (state: RootState) => state.comments.comments;
const selectCommentsSending = (state: RootState) => state.comments.isSending;

const selectCityPlaceCards = createSelector(
  [selectPlaceCards, selectCityName],
  (placeCards, cityName) => placeCards.filter((card) => card.city?.name === cityName)
);

const selectOfferPageData = createSelector(
  [selectOfferCard, selectComments, selectNearbyCards, selectLoadingStatus, selectNearbyLoadingStatus],
  (offerCard, comments, nearbyCards, isLoading, isNearbyLoading) => ({offerCard, comments, nearbyCards, isLoading, isNearbyLoading})
);

const selectSortedComments = createSelector(
  [selectComments],
  (comments) => [...comments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);

const selectCommentsData = createSelector(
  [selectSortedComments, selectCommentsSending],
  (comments, isSending) => ({
    comments,
    isSending,
  })
);

export {
  selectCityName,
  selectLoadingStatus,
  selectAuthStatus,
  selectUser,
  selectCityPlaceCards,
  selectOfferPageData,
  selectSortedComments,
  selectCommentsData
};
