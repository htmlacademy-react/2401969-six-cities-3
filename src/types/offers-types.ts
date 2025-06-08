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

export {
  type Location,
  type CityName,
  type City,
  type Host,
  type PlaceCardProps
};
