import { SortType } from './const';
import { PlaceCardProps } from './mocks/mock-offers';

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

export { sortOffers };
