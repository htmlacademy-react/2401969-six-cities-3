import { City, CITIES } from '../../const';
import { useState } from 'react';

type CityProps = City & {
  onClick: () => void;
};

function LocationsItem({ name, isActive, onClick }: CityProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive && ('tabs__item--active')}`}
        href="#"
        onClick={onClick}
      >
        <span>{ name }</span>
      </a>
    </li>
  );
}

type LocationsProps = {
  onCityChange: (cityName: string) => void;
}

function Locations({ onCityChange }: LocationsProps): JSX.Element {
  const [activeCity, setActiveCity] = useState<string>('Paris');
  const handleCityClick = (cityName: string) => {
    setActiveCity(cityName);
    onCityChange(cityName);
  };
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <LocationsItem
              key={city.name}
              name={city.name}
              isActive={activeCity === city.name}
              onClick={() => handleCityClick(city.name)}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export { Locations };
