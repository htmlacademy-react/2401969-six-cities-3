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
      'img/apartment-01.jpg'
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
      'img/apartment-01.jpg'
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
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    },
    location: {
      latitude: 51.217402,
      longitude: 6.7693140000000005,
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
      'img/apartment-01.jpg',
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
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    },
    location: {
      latitude: 51.237402,
      longitude: 6.779314,
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
      'img/apartment-01.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    maxAdults: 10,
  },
  {
    id: '6',
    title: 'Elegant Art Nouveau Apartment',
    description: 'Stunning apartment in historic building with original features and modern comforts.',
    type: 'Apartment',
    price: 135,
    rating: 4.6,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.850346,
        longitude: 4.351721,
        zoom: 13
      }
    },
    location: {
      latitude: 50.841346,
      longitude: 4.361721,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '7',
    title: 'Cozy Studio Near Grand Place',
    description: 'Perfectly located small studio with all essentials for comfortable stay.',
    type: 'Room',
    price: 70,
    rating: 3.9,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/room.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.850346,
        longitude: 4.351721,
        zoom: 13
      }
    },
    location: {
      latitude: 50.847346,
      longitude: 4.352721,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Towels'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 2,
  },
  {
    id: '8',
    title: 'Luxury Penthouse with City View',
    description: 'Spectacular views over Brussels from this high-end penthouse apartment.',
    type: 'Apartment',
    price: 210,
    rating: 4.8,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.850346,
        longitude: 4.351721,
        zoom: 13
      }
    },
    location: {
      latitude: 50.855346,
      longitude: 4.355721,
      zoom: 16
    },
    bedrooms: 3,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
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
      'img/apartment-01.jpg'
    ],
    maxAdults: 6,
  },
  {
    id: '9',
    title: 'Charming Townhouse in EU District',
    description: 'Beautifully restored townhouse close to European institutions.',
    type: 'House',
    price: 185,
    rating: 4.5,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-small-04.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.850346,
        longitude: 4.351721,
        zoom: 13
      }
    },
    location: {
      latitude: 50.843346,
      longitude: 4.366721,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Heating',
      'Kitchen',
      'Dishwasher'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-02.jpg',
      'img/room.jpg',
      'img/apartment-small-04.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '10',
    title: 'Modern Design Loft',
    description: 'Industrial-chic loft space with contemporary furnishings and art.',
    type: 'Apartment',
    price: 155,
    rating: 4.3,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.850346,
        longitude: 4.351721,
        zoom: 13
      }
    },
    location: {
      latitude: 50.848346,
      longitude: 4.349721,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Cabel TV'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 3,
  },
  {
    id: '11',
    title: 'Harbor View Loft',
    description: 'Modern loft with panoramic views of Hamburg harbor and city skyline.',
    type: 'Apartment',
    price: 165,
    rating: 4.7,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.551086,
        longitude: 9.993682,
        zoom: 13
      }
    },
    location: {
      latitude: 53.548086,
      longitude: 9.991682,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '12',
    title: 'Cozy Room in Altona',
    description: 'Quiet residential area with excellent transport connections to city center.',
    type: 'Room',
    price: 65,
    rating: 4.1,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/room.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.551086,
        longitude: 9.993682,
        zoom: 13
      }
    },
    location: {
      latitude: 53.553086,
      longitude: 9.935682,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Towels'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 2,
  },
  {
    id: '13',
    title: 'Design Apartment in Sternschanze',
    description: 'Trendy neighborhood with cafes and boutiques, perfect for young travelers.',
    type: 'Apartment',
    price: 125,
    rating: 4.5,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.551086,
        longitude: 9.993682,
        zoom: 13
      }
    },
    location: {
      latitude: 53.560086,
      longitude: 9.965682,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Cabel TV'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 2,
  },
  {
    id: '14',
    title: 'Luxury Waterfront Villa',
    description: 'Exclusive property directly at the Alster Lake with private dock.',
    type: 'House',
    price: 320,
    rating: 4.9,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.551086,
        longitude: 9.993682,
        zoom: 13
      }
    },
    location: {
      latitude: 53.558086,
      longitude: 10.005682,
      zoom: 16
    },
    bedrooms: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
      'Towels',
      'Baby seat'
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
      'img/apartment-01.jpg',
      'img/room.jpg'
    ],
    maxAdults: 8,
  },
  {
    id: '15',
    title: 'Historic Speicherstadt Loft',
    description: 'Unique warehouse conversion in Hamburg\'s famous Speicherstadt district.',
    type: 'Apartment',
    price: 195,
    rating: 4.6,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-small-04.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.551086,
        longitude: 9.993682,
        zoom: 13
      }
    },
    location: {
      latitude: 53.545086,
      longitude: 9.999682,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Dishwasher',
      'Cabel TV'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-small-04.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '16',
    title: 'Budget Hotel Near Hauptbahnhof',
    description: 'Simple and clean accommodation just steps from central train station.',
    type: 'Hotel',
    price: 85,
    rating: 3.8,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.551086,
        longitude: 9.993682,
        zoom: 13
      }
    },
    location: {
      latitude: 53.552086,
      longitude: 9.998682,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Towels',
      'Heating',
      'TV'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/room.jpg'
    ],
    maxAdults: 2,
  },
  {
    id: '17',
    title: 'Canal View Premium Apartment',
    description: 'Luxurious apartment with direct views of Amsterdam\'s iconic canals.',
    type: 'Apartment',
    price: 210,
    rating: 4.8,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '18',
    title: 'Modern Studio in De Pijp',
    description: 'Cozy studio in Amsterdam\'s vibrant Latin Quarter, close to markets and cafes.',
    type: 'Room',
    price: 95,
    rating: 4.3,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine',
      'Kitchen'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/room.jpg'
    ],
    maxAdults: 2,
  },
  {
    id: '19',
    title: 'Design Loft in Jordaan',
    description: 'Industrial-style loft in Amsterdam\'s most picturesque neighborhood.',
    type: 'Apartment',
    price: 175,
    rating: 4.6,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Dishwasher',
      'Cabel TV'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-03.jpg',
      'img/apartment-02.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 3,
  },
  {
    id: '20',
    title: 'Houseboat on Amstel River',
    description: 'Unique experience living on a traditional Dutch houseboat with all modern comforts.',
    type: 'House',
    price: 195,
    rating: 4.7,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-small-04.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Coffee machine',
      'Fridge'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-small-04.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '21',
    title: 'Elegant Marais Apartment',
    description: 'Chic apartment in the heart of Le Marais with Haussmannian architecture.',
    type: 'Apartment',
    price: 185,
    rating: 4.7,
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
      latitude: 48.85761,
      longitude: 2.362499,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '22',
    title: 'Montmartre Artist Studio',
    description: 'Authentic artist studio with Sacré-Cœur view, full of Parisian charm.',
    type: 'Room',
    price: 110,
    rating: 4.4,
    isPremium: false,
    isFavorite: false,
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
      latitude: 48.88661,
      longitude: 2.343499,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-01.jpg',
      'img/room.jpg'
    ],
    maxAdults: 2,
  },
  {
    id: '23',
    title: 'Luxury Suite near Champs-Élysées',
    description: 'High-end suite with premium services in golden triangle district.',
    type: 'Hotel',
    price: 290,
    rating: 4.9,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.87061,
      longitude: 2.307499,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Air conditioning',
      'Heating',
      'Coffee machine',
      'Minibar',
      'Cabel TV',
      'Safe'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg'
    ],
    maxAdults: 2,
  },
  {
    id: '24',
    title: 'Latin Quarter Loft',
    description: 'Modern loft in historic building near Sorbonne University.',
    type: 'Apartment',
    price: 135,
    rating: 4.2,
    isPremium: false,
    isFavorite: true,
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
      latitude: 48.84861,
      longitude: 2.344499,
      zoom: 16
    },
    bedrooms: 1,
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Cabel TV'
    ],
    host: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    images: [
      'img/apartment-02.jpg',
      'img/room.jpg'
    ],
    maxAdults: 3,
  },
  {
    id: '25',
    title: 'Eiffel Tower View Balcony',
    description: 'Iconic Parisian experience with direct view of Eiffel Tower from private balcony.',
    type: 'Apartment',
    price: 230,
    rating: 4.8,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-small-04.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85861,
      longitude: 2.293499,
      zoom: 16
    },
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    images: [
      'img/apartment-small-04.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 4,
  }
];

export {
  type Location,
  type CityName,
  type City,
  type Host,
  type PlaceCardProps,
  placeCards, };
