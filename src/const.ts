enum AuthorizationStatus {
  Auth = 'AUTH',
  NotAuth = 'NOT_AUTH',
  Unknown = 'UNKNOWN',
}

enum RequestStatus {
  Idle,
  Loading,
  Success,
  Failed,
}
enum ResponseStatus {
  Idle,
  Sending,
  Success,
  Failed,
}

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer',
}

enum ApiRoute {
  Offers ='/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
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

const MAX_COMMENTS = 10;

const MIN_REVIEW_LENGTH = 50;

const MAX_RATING = 5;

const RATING_TITLES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

const MARKER_DEFAULT_URL = 'img/pin.svg';

const MARKER_ACTIVE_URL = 'img/pin-active.svg';

const TILE_LAYER_URL: string = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

const TILE_LAYER_ATTRIBUTION: string = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export {
  AuthorizationStatus,
  RequestStatus,
  ResponseStatus,
  AppRoute,
  ApiRoute,
  type SortType,
  type SortOption,
  SortOptions,
  DEFAULT_SORT,
  CITIES,
  MAX_GALLERY_PHOTOS,
  MAX_NEAR_PLACES,
  MAX_COMMENTS,
  MIN_REVIEW_LENGTH,
  MAX_RATING,
  RATING_TITLES,
  MARKER_DEFAULT_URL,
  MARKER_ACTIVE_URL,
  TILE_LAYER_URL,
  TILE_LAYER_ATTRIBUTION
};
