import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { CityName } from '../../types/offers-types';
import { memo } from 'react';

type CityProps = {
  name: CityName;
  isActive: boolean;
};

const LocationsItem = memo(({ name, isActive }: CityProps): JSX.Element => (
  <li className="locations__item">
    <Link
      to={`${AppRoute.Main}${name}`}
      className={`locations__item-link tabs__item ${isActive ? ('tabs__item--active') : ''}`}
    >
      <span>{ name }</span>
    </Link>
  </li>
));

LocationsItem.displayName = 'LocationsItem';


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
