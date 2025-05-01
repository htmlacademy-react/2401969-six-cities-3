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

type City = {
  name: string;
};

const CITIES: City[] = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
  { name: 'Amsterdam' },
  { name: 'Hamburg' },
  { name: 'Dusseldorf' },
];

const MAX_GALLERY_PHOTOS = 6;

const MAX_NEAR_PLACES = 3;

const RATING_TITLES = ['отлично', 'хорошо', 'нормально', 'плохо', 'ужасно'];

const MARKER_DEFAULT_URL = 'img/pin.svg';

const MARKER_ACTIVE_URL = 'img/pin-active.svg';

export {
  AuthorizationStatus,
  AppRoute,
  type SortOption,
  type City,
  SortOptions,
  CITIES,
  MAX_GALLERY_PHOTOS,
  MAX_NEAR_PLACES,
  RATING_TITLES,
  MARKER_DEFAULT_URL,
  MARKER_ACTIVE_URL,
};
