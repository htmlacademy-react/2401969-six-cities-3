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

export {
  AuthorizationStatus,
  AppRoute,
  type SortOption,
  type City,
  SortOptions,
  CITIES,
};
