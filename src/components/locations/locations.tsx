import { CITIES } from '../../const';

type LocationsItemProps = {
  city: string;
}

function LocationsItem({city}: LocationsItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

function Locations(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (<LocationsItem city={city.name} key={city.id}/>))}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
