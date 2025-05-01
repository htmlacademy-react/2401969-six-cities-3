import { CITIES } from '../const';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type CityName = typeof CITIES[number]

type City = {
  name: CityName;
  location: Location;
};

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type PlaceCardProps = {
  id: string;
  title: string;
  description: string;
  type: 'Apartment' | 'Room' | 'House' | 'Hotel';
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  city: City;
  location: Location;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

const placeCards: PlaceCardProps[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    description: 'Cozy apartment with stunning city views and modern amenities.',
    type: 'Apartment',
    price: 120,
    rating: 4,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-small-04.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/studio-01.jpg'
    ],
    maxAdults: 4,
  },

  {
    id: '2',
    title: 'Wood and stone place',
    description: 'This is a place for dreamers to reset, reflect, and create.',
    type: 'Room',
    price: 80,
    rating: 4.8,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Cabel TV',
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-small-04.jpg',
      'img/room.jpg',
      'img/studio-01.jpg'
    ],
    maxAdults: 2,
  },

  {
    id: '3',
    title: 'Canal View Prinsengracht',
    description:'Spacious house featuring a large backyard and barbecue area',
    type: 'Apartment',
    price: 132,
    rating: 4,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Towels',
      'Heating',
      'Baby seat',
      'Kitchen',
      'Dishwasher',

    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
    ],
    maxAdults: 4,
  },

  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    description: 'Charming studio located near public transport and local shops',
    type: 'Apartment',
    price: 180,
    rating: 5,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-small-03.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.36554,
      longitude: 4.911976,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/room.jpg',

    ],
    maxAdults: 2,
  },

  {
    id: '5',
    title: 'Very-very-very big room',
    description: 'Elegant villa with a private pool and beautiful gardens.',
    type: 'House',
    price: 80,
    rating: 4,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-small-04.jpg',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    location: {
      latitude: 50.960361,
      longitude: 6.967974,
      zoom: 16
    },
    bedrooms: 5,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    maxAdults: 10,
  },
];

export {
  type Location,
  type CityName,
  type City,
  type Host,
  type PlaceCardProps,
  placeCards, };
