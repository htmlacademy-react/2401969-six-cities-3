import { City, CITIES } from '../../const';

type CityProps = City;

function LocationsItem({ name, isActive }: CityProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive && ('tabs__item--active')}`} href="#">
        <span>{ name }</span>
      </a>
    </li>
  );
}

function Locations(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <LocationsItem
              key={city.name}
              name={city.name}
              isActive={city.isActive}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export { Locations };
