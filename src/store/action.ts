import { createAction } from '@reduxjs/toolkit';
import { CityName, PlaceCardProps } from '../mocks/mock-offers';

const setCityName = createAction<CityName>('city/setCityName');
const setOffers = createAction<PlaceCardProps[]>('offers/setOffers');

export {
  setCityName,
  setOffers,
};
