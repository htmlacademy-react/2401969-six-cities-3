import { AppRoute, SortType } from '../const';
import { CommentProps } from '../types/comments-types';
import { PlaceCardProps } from '../types/offers-types';

const sortOffers = (offers: PlaceCardProps[], sortType: SortType): PlaceCardProps[] => {
  switch (sortType) {
    case 'Price: low to high':
      return [...offers].sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return [...offers].sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

const isPrivateRout = (path: string): boolean => {
  const privateRoutes = [
    AppRoute.Favorites,
    AppRoute.Login,
  ];
  return privateRoutes.includes(path as AppRoute);
};

const formatDateToMonthYear = (dateString: string, locale = 'en-US') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });
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
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10,
    },
  },
  location: {
    latitude: 48.86,
    longitude: 2.35,
    zoom: 10,
  },
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

const capitalize = (data: string): string => data[0].toUpperCase() + data.slice(1);

export {
  sortOffers,
  isPrivateRout,
  formatDateToMonthYear,
  createMockPlaceCard,
  createMockReview,
  capitalize,
};
