import { store } from './store';
import {
  selectCityPlaceCards,
  selectOfferPageData,
  selectSortedComments,
} from './selectors';
import { RequestStatus } from '../const';
import { PlaceCardProps } from '../types/offers-types';
import { CommentProps } from '../types/comments-types';


const defaultCityLocation = {
  latitude: 48.8566,
  longitude: 2.3522,
  zoom: 10,
};

const defaultOfferLocation = {
  latitude: 48.86,
  longitude: 2.35,
  zoom: 10,
};

const createMockPlaceCard = (overrides?: Partial<PlaceCardProps>): PlaceCardProps => ({
  id: '1',
  title: 'Test Offer',
  description: 'Test description',
  type: 'Apartment',
  price: 100,
  rating: 4.5,
  bedrooms: 2,
  maxAdults: 3,
  isPremium: false,
  isFavorite: false,
  city: {
    name: 'Paris',
    location: defaultCityLocation,
  },
  location: defaultOfferLocation,
  previewImage: 'img/test.jpg',
  goods: ['Wi-Fi', 'Kitchen'],
  host: {
    name: 'Test Host',
    isPro: true,
    avatarUrl: 'img/avatar.jpg',
  },
  images: ['img/1.jpg', 'img/2.jpg'],
  ...overrides
});

const createMockReview = (overrides?: Partial<CommentProps>): CommentProps => ({
  id: '1',
  date: '2023-01-01',
  user: {
    name: 'Test User',
    avatarUrl: 'img/avatar.jpg',
    isPro: true,
  },
  comment: 'Great place!',
  rating: 5,
  ...overrides
});

describe('Selectors', () => {
  const mockComment1 = createMockReview({
    id: '1',
    date: '2023-01-01T00:00:00.000Z',
    comment: 'Comment 1',
    rating: 4,
  });

  const mockComment2 = createMockReview({
    id: '2',
    date: '2023-01-02T00:00:00.000Z',
    comment: 'Comment 2',
    rating: 5,
  });

  const mockCardParis = createMockPlaceCard({
    id: '1',
    title: 'Paris card',
    city: {
      name: 'Paris',
      location: defaultCityLocation,
    },
  });

  const mockCardCologne = createMockPlaceCard({
    id: '2',
    title: 'Cologne card',
    city: {
      name: 'Cologne',
      location: defaultCityLocation,
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
  });

  const mockCardAmsterdam = createMockPlaceCard({
    id: '3',
    title: 'Amsterdam card',
    city: {
      name: 'Amsterdam',
      location: defaultCityLocation,
    },
    rating: 3,
  });

  const mockOfferCard = createMockPlaceCard({
    id: '4',
    title: 'Offer card',
    price: 300,
    isPremium: true,
    rating: 5,
  });

  const mockNearbyCards = [
    createMockPlaceCard({
      id: '5',
      title: 'Nearby 1',
      price: 120,
      isFavorite: true,
      rating: 4,
    }),
    createMockPlaceCard({
      id: '6',
      title: 'Nearby 2',
      price: 220,
      isPremium: true,
      rating: 5,
    }),
  ];

  describe('selectCityPlaceCards', () => {
    it('should return only cards for selected city', () => {
      const state = store.getState();
      const result = selectCityPlaceCards({
        ...state,
        offers: {
          ...state.offers,
          cityName: 'Paris',
          placeCards: [mockCardParis, mockCardCologne, mockCardAmsterdam],
        },
      });

      expect(result).toEqual([mockCardParis]);
    });

    it('should return empty array if no cards for selected city', () => {
      const state = store.getState();
      const result = selectCityPlaceCards({
        ...state,
        offers: {
          ...state.offers,
          cityName: 'Hamburg',
          placeCards: [mockCardParis, mockCardCologne, mockCardAmsterdam],
        },
      });

      expect(result).toEqual([]);
    });
  });

  describe('selectOfferPageData', () => {
    it('should return offer card, nearby cards and status', () => {
      const state = store.getState();
      const result = selectOfferPageData({
        ...state,
        offers: {
          ...state.offers,
          offerCard: mockOfferCard,
          nearbyCards: mockNearbyCards,
          status: RequestStatus.Success,
        },
      });

      expect(result).toEqual({
        offerCard: mockOfferCard,
        nearbyCards: mockNearbyCards,
        status: RequestStatus.Success,
      });
    });

    it('should handle null offer card', () => {
      const state = store.getState();
      const result = selectOfferPageData({
        ...state,
        offers: {
          ...state.offers,
          offerCard: null,
          nearbyCards: mockNearbyCards,
          status: RequestStatus.Loading,
        },
      });

      expect(result).toEqual({
        offerCard: null,
        nearbyCards: mockNearbyCards,
        status: RequestStatus.Loading,
      });
    });
  });

  describe('selectSortedComments', () => {
    it('should return comments sorted by date in descending order', () => {
      const state = store.getState();
      const result = selectSortedComments({
        ...state,
        comments: {
          ...state.comments,
          comments: [mockComment1, mockComment2],
        },
      });

      expect(result).toEqual([mockComment2, mockComment1]);
    });

    it('should return empty array if no comments', () => {
      const state = store.getState();
      const result = selectSortedComments({
        ...state,
        comments: {
          ...state.comments,
          comments: [],
        },
      });

      expect(result).toEqual([]);
    });
  });
});
