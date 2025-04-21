import { Locations } from '../../components/locations/locations';
import { PlacesSorting } from '../../components/places-sorting/places-sorting';
import { PlacesList } from '../../components/places-list/places-list';
import { PlaceCardProps } from '../../mocks/mocks';
import { useState } from 'react';

type MainIndexProps = {
  placeCards: PlaceCardProps[];
}

function MainIndex({ placeCards }: MainIndexProps): JSX.Element {
  const [cityName, setCityName] = useState<string>('Paris');
  const handleCityChange = (newCityName: string) => {
    setCityName(newCityName);
  };

  const cityPlaceCards = placeCards.filter((place) => place.city?.name === cityName);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Locations onCityChange={handleCityChange} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{cityPlaceCards.length} places to stay in {cityName}</b>
            <PlacesSorting />
            <PlacesList placeCards={cityPlaceCards} />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export { MainIndex };
