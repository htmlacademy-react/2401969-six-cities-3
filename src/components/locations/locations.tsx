import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { CityName } from '../../mocks/mock-offers';

type CityProps = {
  name: CityName;
  isActive: boolean;
};

function LocationsItem({ name, isActive }: CityProps): JSX.Element {
  return (
    <li className="locations__item">
      <Link
        to={`${AppRoute.Main}${name}`}
        className={`locations__item-link tabs__item ${isActive ? ('tabs__item--active') : ''}`}
      >
        <span>{ name }</span>
      </Link>
    </li>
  );
}

type LocationsProps = {
  activeCity: CityName;
}

function Locations({activeCity }: LocationsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <LocationsItem
              key={city}
              name={city}
              isActive={activeCity === city}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export { Locations };
