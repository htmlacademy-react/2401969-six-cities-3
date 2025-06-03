import { createSelector } from '@reduxjs/toolkit';
import { offersSelectors } from './slices/offers-slice';
import { commentsSelectors } from './slices/comments-slice';

const selectCityPlaceCards = createSelector(
  [offersSelectors.placeCards, offersSelectors.cityName],
  (placeCards, cityName) => placeCards.filter((card) => card.city?.name === cityName)
);

const selectOfferPageData = createSelector(
  [offersSelectors.offerCard, offersSelectors.nearbyCards, offersSelectors.status],
  (offerCard, nearbyCards, status) => ({offerCard, nearbyCards, status})
);

const selectSortedComments = createSelector(
  [commentsSelectors.comments],
  (comments) => [...comments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);

const selectCommentsData = createSelector(
  [selectSortedComments, commentsSelectors.responseStatus],
  (comments, isSending) => ({
    comments,
    isSending,
  })
);

export {
  selectCityPlaceCards,
  selectOfferPageData,
  selectSortedComments,
  selectCommentsData,
};
