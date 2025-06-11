import { CITIES, RequestStatus } from '../../const';
import { CityName, PlaceCardProps } from '../../types/offers-types';

import { createMockPlaceCard } from '../../utils';
import { offersActions, offersReducer, offersSelectors } from './offers-slice';

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
