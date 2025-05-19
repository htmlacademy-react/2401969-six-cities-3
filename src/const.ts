enum AuthorizationStatus {
  Auth = 'AUTH',
  NotAuth = 'NOT_AUTH',
  Unknown = 'UNKNOWN',
}

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer',
}

enum ApiRoute {
  Offers ='/offers',
  OfferById = '/offers/{offerId}',
  Login = '/login',
  Logout = '/logout'
}

type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type SortOption = {
  value: SortType;
};

const SortOptions: SortOption[] = [
  { value: 'Popular' },
  { value: 'Price: low to high' },
  { value: 'Price: high to low' },
  { value: 'Top rated first' }
];

const DEFAULT_SORT = SortOptions[0];

const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const MAX_GALLERY_PHOTOS = 6;

const MAX_NEAR_PLACES = 3;

const RATING_TITLES = ['отлично', 'хорошо', 'нормально', 'плохо', 'ужасно'];

const MARKER_DEFAULT_URL = 'img/pin.svg';

const MARKER_ACTIVE_URL = 'img/pin-active.svg';

const TILE_LAYER_URL: string = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

const TILE_LAYER_ATTRIBUTION: string = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export {
  AuthorizationStatus,
  AppRoute,
  ApiRoute,
  type SortType,
  type SortOption,
  SortOptions,
  DEFAULT_SORT,
  CITIES,
  MAX_GALLERY_PHOTOS,
  MAX_NEAR_PLACES,
  RATING_TITLES,
  MARKER_DEFAULT_URL,
  MARKER_ACTIVE_URL,
  TILE_LAYER_URL,
  TILE_LAYER_ATTRIBUTION
};
