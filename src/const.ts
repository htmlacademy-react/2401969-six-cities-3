const Setting = {
  CardsCount: 5,
};

type City = {
  id: number;
  name: string;
};

const CITIES: City[] = [
  { id: 1, name: 'Paris' },
  { id: 2, name: 'Cologne' },
  { id: 3, name: 'Brussels' },
  { id: 4, name: 'Amsterdam' },
  { id: 5, name: 'Hamburg' },
  { id: 6, name: 'Dusseldorf' }
];

export { Setting, CITIES };
