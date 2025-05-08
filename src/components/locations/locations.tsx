import { CITIES } from '../../const';
import { CityName } from '../../mocks/mock-offers';

type CityProps = {
  name: CityName;
  isActive: boolean;
  onClick: () => void;
};

function LocationsItem({ name, isActive, onClick }: CityProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? ('tabs__item--active') : ''}`}
        href="#"
        onClick={onClick}
      >
        <span>{ name }</span>
      </a>
    </li>
  );
}

type LocationsProps = {
  activeCity: CityName;
  onCityChange: (city: CityName) => void;
}

function Locations({activeCity, onCityChange}: LocationsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <LocationsItem
              key={city}
              name={city}
              isActive={activeCity === city}
              onClick={() => onCityChange(city)}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export { Locations };
