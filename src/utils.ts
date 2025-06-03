import { AppRoute, SortType } from './const';
import { PlaceCardProps } from './types/offers-types';

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

export {
  sortOffers,
  isPrivateRout,
  formatDateToMonthYear
};
