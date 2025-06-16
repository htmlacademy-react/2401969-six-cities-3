import { describe, it } from 'vitest';
import { CITIES, RequestStatus } from '../../const';
import { CityName, PlaceCardProps } from '../../types/offers-types';
import { createMockPlaceCard } from '../../utils/utils';
import { offersActions, offersReducer, offersSelectors } from './offers-slice';
import { fetchFavorites, fetchNearbyOffers, fetchOffers, toggleFavorite } from '../thunks/offers-thunks';

type OffersState = {
  cityName: CityName;
  placeCards: PlaceCardProps[];
  nearbyCards: PlaceCardProps[];
  offerCard: PlaceCardProps | null;
  favoriteCards: PlaceCardProps[];
  status: RequestStatus;
}

describe('offers-slice', () => {
  const defaultCity = 'Paris';
  const testCity = CITIES[1];

  const initialState: OffersState = {
    cityName: defaultCity,
    placeCards: [],
    nearbyCards: [],
    offerCard: null,
    favoriteCards: [],
    status: RequestStatus.Idle,
  };

  describe('reducers', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };

      const result = offersReducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action and underfind state', () => {
      const emptyAction = { type: '' };

      const result = offersReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should update only city name and keep other state unchanged', () => {
      const state = {
        ...initialState,
        placeCards: [createMockPlaceCard()],
      };

      const result = offersReducer(state, offersActions.setCityName(testCity));

      expect(result).toEqual({
        ...state,
        cityName: testCity,
      });
    });

    it('should clear offerCard on clearCurrentOffer', () => {
      const state = {
        ...initialState,
        offerCard: createMockPlaceCard(),
      };
      const result = offersReducer(state, offersActions.clearCurrentOffer());
      expect(result.offerCard).toBeNull();
    });

    it('should clear nearbyCards on clearNearbyOffers', () => {
      const state = {
        ...initialState,
        nearbyCards: [createMockPlaceCard()],
      };
      const result = offersReducer(state, offersActions.clearNearbyOffers());
      expect(result.nearbyCards).toEqual([]);
    });
  });

  describe('extraReducers', () => {
    describe('fetchOffers', () => {
      it('should set status to "Loading" when fetchOffers.pending is called', () => {
        const action = { type: fetchOffers.pending.type };
        const state = offersReducer(initialState, action);

        expect(state.status).toBe(RequestStatus.Loading);
        expect(state.placeCards).toEqual(initialState.placeCards);
        expect(state.cityName).toBe(initialState.cityName);
      });

      it('should update placeCards and set status to "Success" when fetchOffers.fulfilled', () => {
        const mockOffers = [
          createMockPlaceCard({ id: '1', title: 'Offer 1' }),
          createMockPlaceCard({ id: '2', title: 'Offer 2' }),
        ];
        const action = {
          type: fetchOffers.fulfilled.type,
          payload: mockOffers,
        };
        const state = offersReducer(initialState, action);

        expect(state.status).toBe(RequestStatus.Success);
        expect(state.placeCards).toEqual(mockOffers);
        expect(state.cityName).toBe(initialState.cityName);
        expect(state.nearbyCards).toEqual(initialState.nearbyCards);
      });

      it('should not modify favorites or nearby offers when fetchOffers.fulfilled', () => {
        const mockFavorites = [createMockPlaceCard({ id: 'fav1', isFavorite: true })];
        const mockNearby = [createMockPlaceCard({ id: 'near1' })];
        const stateWithData = {
          ...initialState,
          favoriteCards: mockFavorites,
          nearbyCards: mockNearby
        };
        const action = {
          type: fetchOffers.fulfilled.type,
          payload: [createMockPlaceCard({ id: 'new1' })]
        };
        const state = offersReducer(stateWithData, action);

        expect(state.favoriteCards).toEqual(mockFavorites);
        expect(state.nearbyCards).toEqual(mockNearby);
      });

      it('should set status to "Failed" and keep previous offers when fetchOffers.rejected', () => {
        const stateWithOffers = {
          ...initialState,
          placeCards: [createMockPlaceCard({ id: 'existing' })],
          status: RequestStatus.Loading
        };
        const action = { type: fetchOffers.rejected.type };
        const state = offersReducer(stateWithOffers, action);

        expect(state.status).toBe(RequestStatus.Failed);
        expect(state.placeCards).toEqual(stateWithOffers.placeCards);
      });
    });

    describe('fetchNearbyOffers', () => {
      const mockNearbyOffers = [
        createMockPlaceCard({ id: '10', title: 'Nearby Offer 1' }),
        createMockPlaceCard({ id: '20', title: 'Nearby Offer 2' })
      ];

      it('should set status to "Loading" when fetchNearbyOffers.pending', () => {
        const action = { type: fetchNearbyOffers.pending.type };
        const state = offersReducer(initialState, action);

        expect(state.status).toBe(RequestStatus.Loading);
        expect(state.placeCards).toEqual(initialState.placeCards);
      });

      it('should update nearbyCards and set status to "Success" when fetchNearbyOffers.fulfilled', () => {
        const action = {
          type: fetchNearbyOffers.fulfilled.type,
          payload: mockNearbyOffers
        };
        const state = offersReducer(initialState, action);

        expect(state.status).toBe(RequestStatus.Success);
        expect(state.nearbyCards).toEqual(mockNearbyOffers);
        expect(state.placeCards).toEqual(initialState.placeCards);
        expect(state.offerCard).toBeNull();
      });

      it('should not modify current offer when updating nearby offers', () => {
        const mockOffer = createMockPlaceCard({ id: 'current' });
        const stateWithOffer = {
          ...initialState,
          offerCard: mockOffer
        };
        const action = {
          type: fetchNearbyOffers.fulfilled.type,
          payload: mockNearbyOffers
        };
        const state = offersReducer(stateWithOffer, action);

        expect(state.offerCard).toEqual(mockOffer);
      });

      it('should set status to "Failed" when fetchNearbyOffers.rejected', () => {
        const stateWithNearby = {
          ...initialState,
          nearbyCards: [createMockPlaceCard({ id: 'existing' })]
        };
        const action = { type: fetchNearbyOffers.rejected.type };
        const state = offersReducer(stateWithNearby, action);

        expect(state.status).toBe(RequestStatus.Failed);
        expect(state.nearbyCards).toEqual(stateWithNearby.nearbyCards);
      });
    });

    describe('fetchFavorites', () => {
      const mockFavorites = [
        createMockPlaceCard({ id: 'fav1', title: 'Favorite 1', isFavorite: true }),
        createMockPlaceCard({ id: 'fav2', title: 'Favorite 2', isFavorite: true })
      ];

      it('should set status to "Loading" when fetchFavorites.pending', () => {
        const action = { type: fetchFavorites.pending.type };
        const state = offersReducer(initialState, action);

        expect(state.status).toBe(RequestStatus.Loading);
        expect(state.favoriteCards).toEqual(initialState.favoriteCards);
      });

      it('should update favoriteCards and set status to "Success" when fetchFavorites.fulfilled', () => {
        const action = {
          type: fetchFavorites.fulfilled.type,
          payload: mockFavorites
        };
        const state = offersReducer(initialState, action);

        expect(state.status).toBe(RequestStatus.Success);
        expect(state.favoriteCards).toEqual(mockFavorites);
        expect(state.placeCards).toEqual(initialState.placeCards);
      });

      it('should replace all favorites on fulfilled', () => {
        const stateWithFavorites = {
          ...initialState,
          favoriteCards: [createMockPlaceCard({ id: 'old', isFavorite: true })]
        };
        const action = {
          type: fetchFavorites.fulfilled.type,
          payload: [createMockPlaceCard({ id: 'new', isFavorite: true })]
        };
        const state = offersReducer(stateWithFavorites, action);

        expect(state.favoriteCards).toHaveLength(1);
        expect(state.favoriteCards[0].id).toBe('new');
      });

      it('should clear favorites and set status to "Failed" when fetchFavorites.rejected', () => {
        const stateWithFavorites = {
          ...initialState,
          favoriteCards: [createMockPlaceCard({ id: 'existing', isFavorite: true })]
        };
        const action = { type: fetchFavorites.rejected.type };
        const state = offersReducer(stateWithFavorites, action);

        expect(state.status).toBe(RequestStatus.Failed);
        expect(state.favoriteCards).toEqual([]);
      });

      it('should not modify nearby offers when updating favorites', () => {
        const mockNearby = [createMockPlaceCard({ id: 'near1' })];
        const stateWithNearby = {
          ...initialState,
          nearbyCards: mockNearby
        };
        const action = {
          type: fetchFavorites.fulfilled.type,
          payload: mockFavorites
        };
        const state = offersReducer(stateWithNearby, action);

        expect(state.nearbyCards).toEqual(mockNearby);
      });

      it('should handle empty favorites array', () => {
        const action = {
          type: fetchFavorites.fulfilled.type,
          payload: []
        };
        const state = offersReducer(initialState, action);

        expect(state.favoriteCards).toEqual([]);
      });
    });

    describe('toggleFavorite', () => {
      const mockOffer = createMockPlaceCard({ id: '1', isFavorite: false });
      const mockFavoriteOffer = createMockPlaceCard({ id: '1', isFavorite: true });

      describe('pending', () => {
        it('should immediately update isFavorite status in placeCards', () => {
          const stateWithOffers = {
            ...initialState,
            placeCards: [mockOffer]
          };
          const action = toggleFavorite.pending('', { offerId: '1', status: 1 });
          const state = offersReducer(stateWithOffers, action);

          expect(state.placeCards[0].isFavorite).toBe(true);
        });

        it('should not affect state if offer not found in placeCards', () => {
          const action = toggleFavorite.pending('', { offerId: '999', status: 1 });
          const state = offersReducer(initialState, action);

          expect(state).toEqual(initialState);
        });
      });

      describe('fulfilled', () => {
        it('should update all instances of offer (placeCards, nearbyCards, offerCard, favorites)', () => {
          const stateWithData = {
            ...initialState,
            placeCards: [mockOffer],
            nearbyCards: [mockOffer],
            offerCard: mockOffer,
            favoriteCards: []
          };
          const action = toggleFavorite.fulfilled(mockFavoriteOffer, '', { offerId: '1', status: 1 });
          const state = offersReducer(stateWithData, action);

          expect(state.placeCards[0].isFavorite).toBe(true);
          expect(state.nearbyCards[0].isFavorite).toBe(true);
          expect(state.offerCard?.isFavorite).toBe(true);
          expect(state.favoriteCards).toEqual([mockFavoriteOffer]);
        });

        it('should remove from favorites when isFavorite becomes false', () => {
          const stateWithFavorite = {
            ...initialState,
            favoriteCards: [mockFavoriteOffer]
          };
          const action = toggleFavorite.fulfilled(mockOffer, '', { offerId: '1', status: 0 });
          const state = offersReducer(stateWithFavorite, action);

          expect(state.favoriteCards).toEqual([]);
        });

        it('should handle case when offer not found in any collection', () => {
          const action = toggleFavorite.fulfilled(mockFavoriteOffer, '', { offerId: '999', status: 1 });
          const state = offersReducer(initialState, action);

          expect(state.favoriteCards).toEqual([mockFavoriteOffer]);
        });
      });

      describe('rejected', () => {
        it('should revert isFavorite status in placeCards', () => {
          const stateWithOffers = {
            ...initialState,
            placeCards: [mockOffer]
          };
          const pendingState = offersReducer(
            stateWithOffers,
            toggleFavorite.pending('', { offerId: '1', status: 1 })
          );
          const rejectedState = offersReducer(
            pendingState,
            toggleFavorite.rejected(null, '', { offerId: '1', status: 1 }, null)
          );

          expect(rejectedState.placeCards[0].isFavorite).toBe(false);
        });

        it('should not modify favorites on rejection', () => {
          const stateWithFavorite = {
            ...initialState,
            favoriteCards: [mockFavoriteOffer]
          };
          const action = toggleFavorite.rejected(null, '', { offerId: '1', status: 0 }, null);
          const state = offersReducer(stateWithFavorite, action);

          expect(state.favoriteCards).toEqual([mockFavoriteOffer]);
        });
      });

      it('should correctly handle partial presence (only in placeCards)', () => {
        const stateWithData = {
          ...initialState,
          placeCards: [mockOffer],
          favoriteCards: []
        };
        const action = toggleFavorite.fulfilled(mockFavoriteOffer, '', { offerId: '1', status: 1 });
        const state = offersReducer(stateWithData, action);

        expect(state.placeCards[0].isFavorite).toBe(true);
        expect(state.favoriteCards).toEqual([mockFavoriteOffer]);
        expect(state.nearbyCards).toEqual([]);
      });
    });
  });

  describe('selectors', () => {
    it('should return city name', () => {
      const state = {
        ...initialState,
        cityName: testCity,
      };
      expect(offersSelectors.cityName.unwrapped(state)).toBe(testCity);
    });

    it('should return place cards', () => {
      const mockCard = createMockPlaceCard({ id: '123'});
      const state = {
        ...initialState,
        placeCards: [mockCard],
      };
      expect(offersSelectors.placeCards.unwrapped(state)).toEqual([mockCard]);
    });

    it('should return current offer card', () => {
      const mockCard = createMockPlaceCard({ id: '123'});
      const state = {
        ...initialState,
        offerCard: mockCard,
      };
      expect(offersSelectors.offerCard.unwrapped(state)).toEqual(mockCard);
    });

    it('should return null if offer card is not loaded', () => {
      const state = {
        ...initialState,
        offerCard: null,
      };
      expect(offersSelectors.offerCard.unwrapped(state)).toBeNull();
    });

    it('should return nearby cards', () => {
      const mockCard = createMockPlaceCard({ id: '123'});
      const state = {
        ...initialState,
        nearbyCards: [mockCard],
      };
      expect(offersSelectors.nearbyCards.unwrapped(state)).toEqual([mockCard]);
    });

    it('should return favorite cards', () => {
      const mockCard = createMockPlaceCard({ id: '123', isFavorite: true });
      const state = {
        ...initialState,
        favoriteCards: [mockCard],
      };
      expect(offersSelectors.favoritesCards.unwrapped(state)).toEqual([mockCard]);
    });

    it('should return current status', () => {
      const state = {
        ...initialState,
        status: RequestStatus.Loading,
      };
      expect(offersSelectors.status.unwrapped(state)).toBe(RequestStatus.Loading);
    });
  });
});
