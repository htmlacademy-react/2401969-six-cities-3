import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import {
  fetchOffers,
  fetchOfferById,
  fetchNearbyOffers,
  fetchFavorites,
} from './offers-thunks';
import { offersReducer } from '../slices/offers-slice';
import { ApiRoute, RequestStatus } from '../../const';
import { AppThunkDispatch, RootState } from '../types';
import { createMockPlaceCard } from '../../utils';

type TestStore = {
  dispatch: AppThunkDispatch;
  getState: () => RootState;
};

describe('Offers thunks', () => {
  const api = createAPI();
  const mockAxios = new MockAdapter(api);
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        offers: offersReducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api
          }
        })
    })as unknown as TestStore;

    mockAxios.reset();
  });

  describe('fetchOffers', () => {
    it('should update state with offers on success', async () => {
      const mockOffers = [
        createMockPlaceCard({ id: '1' }),
        createMockPlaceCard({ id: '2', isFavorite: true })
      ];

      mockAxios.onGet(ApiRoute.Offers).reply(200, mockOffers);
      await store.dispatch(fetchOffers());

      const state = store.getState().offers;
      expect(state.status).toBe(RequestStatus.Success);
      expect(state.placeCards).toEqual(mockOffers);
    });
  });

  describe('fetchOfferById', () => {
    it('should set offer details', async () => {
      const mockOffer = createMockPlaceCard({
        id: '10',
        description: 'Luxury apartment'
      });

      mockAxios.onGet(`${ApiRoute.Offers}/10`).reply(200, mockOffer);
      await store.dispatch(fetchOfferById('10'));

      expect(store.getState().offers.offerCard).toEqual(mockOffer);
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should set nearby offers', async () => {
      const mockOffers = [
        createMockPlaceCard({ id: '101' }),
        createMockPlaceCard({ id: '102' })
      ];

      mockAxios.onGet(`${ApiRoute.Offers}/1/nearby`).reply(200, mockOffers);
      await store.dispatch(fetchNearbyOffers('1'));

      expect(store.getState().offers.nearbyCards).toEqual(mockOffers);
    });
  });

  describe('fetchFavorites', () => {
    it('should update favorites and clear on error', async () => {
      // Успешный запрос
      const mockFavorites = [
        createMockPlaceCard({ id: '1', isFavorite: true }),
        createMockPlaceCard({ id: '2', isFavorite: true })
      ];
      mockAxios.onGet(ApiRoute.Favorite).reply(200, mockFavorites);
      await store.dispatch(fetchFavorites());
      expect(store.getState().offers.favoriteCards).toEqual(mockFavorites);

      // Ошибка
      mockAxios.onGet(ApiRoute.Favorite).reply(500);
      await store.dispatch(fetchFavorites());
      expect(store.getState().offers.favoriteCards).toEqual([]);
    });
  });
});
