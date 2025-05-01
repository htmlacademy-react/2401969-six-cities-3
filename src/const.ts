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

type SortOption = {
  value: string;
  isActive: boolean;
}

const SortOptions: SortOption[] = [
  {
    value:'Popular',
    isActive: true
  },
  {
    value:'Price: low to high',
    isActive: false
  },
  {
    value:'Price: high to low',
    isActive: false
  },
  {
    value:'Top rated first',
    isActive: false
  }
];

const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const MAX_GALLERY_PHOTOS = 6;

const MAX_NEAR_PLACES = 3;

const RATING_TITLES = ['отлично', 'хорошо', 'нормально', 'плохо', 'ужасно'];

const MARKER_DEFAULT_URL = 'img/pin.svg';

const MARKER_ACTIVE_URL = 'img/pin-active.svg';

const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export {
  AuthorizationStatus,
  AppRoute,
  type SortOption,
  SortOptions,
  CITIES,
  MAX_GALLERY_PHOTOS,
  MAX_NEAR_PLACES,
  RATING_TITLES,
  MARKER_DEFAULT_URL,
  MARKER_ACTIVE_URL,
  TILE_LAYER_URL,
  TILE_LAYER_ATTRIBUTION
};
