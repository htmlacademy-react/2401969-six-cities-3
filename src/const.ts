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
  isActive: boolean;
};

const CITIES: City[] = [
  { name: 'Paris', isActive: false, },
  { name: 'Cologne', isActive: false, },
  { name: 'Brussels', isActive: false, },
  { name: 'Amsterdam', isActive: true,},
  { name: 'Hamburg', isActive: false,},
  { name: 'Dusseldorf', isActive: false, }
];

export {
  type SortOption,
  type City,
  SortOptions,
  CITIES,
};
