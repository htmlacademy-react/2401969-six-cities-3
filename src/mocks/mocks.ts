export type PlaceCardProps = {
  id?: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium?: boolean;
  isFavorite?: boolean;
  previewImage: string;
};

const placeCards: PlaceCardProps[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    rating: 80,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
  },

  {
    id: 2,
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 80,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
  },

  {
    id: 3,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 80,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
  },

  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 100,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-03.jpg',
  },

  {
    id: 5,
    title: 'Very-very big room',
    type: 'Room',
    price: 80,
    rating: 80,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-small-04.jpg',
  }
];

export { placeCards };
