import { CITIES } from '../../const';

type LocationsItemProps = {
  children: string;
}

function LocationsItem({children}: LocationsItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{children}</span>
      </a>
    </li>
  );
}

function Locations(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => <LocationsItem key={city.id}>{city.name}</LocationsItem>)}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
