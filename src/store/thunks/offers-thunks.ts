import { ApiRoute } from '../../const';
import { PlaceCardProps } from '../../types/offers-types';
import { createAppAsyncThunk } from '../types';

const fetchOffers = createAppAsyncThunk<PlaceCardProps[], undefined>(
  'offers/fetchOffers',
  async(_, { extra: api }) => {
    const {data} = await api.get<PlaceCardProps[]>(ApiRoute.Offers);
    return data;
  }
);

const fetchOfferById = createAppAsyncThunk<PlaceCardProps, string>(
  'offers/fetchById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<PlaceCardProps>(`${ApiRoute.Offers}/${offerId}`);
    return data;
  }
);

const fetchNearbyOffers = createAppAsyncThunk<PlaceCardProps[], string>(
  'offers/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<PlaceCardProps[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

const fetchFavorites = createAppAsyncThunk<PlaceCardProps[], undefined>(
  'offers/fetchFavorites',
  async (_, { extra: api }) => {
    const { data } = await api.get<PlaceCardProps[]>(ApiRoute.Favorite);
    return data;
  }
);

const toggleFavorite = createAppAsyncThunk<PlaceCardProps, { offerId: string; status: number }>(
  'offers/toggleFavorite',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<PlaceCardProps>(`${ApiRoute.Favorite}/${offerId}/${status}`);
    return data;
  }
);

export {
  fetchOffers,
  fetchOfferById,
  fetchNearbyOffers,
  fetchFavorites,
  toggleFavorite,
};
