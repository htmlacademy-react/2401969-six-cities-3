import { Header } from '../../components/header/header';
import { Locations } from '../../components/locations/locations';
import { MainIndex } from '../../components/main-index/main-index';
import { MainIndexEmpty } from '../../components/main-index/main-index-empty';
import { PlaceCardProps } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const';
import { useState } from 'react';


type MainPageProps = {
  placeCards: PlaceCardProps[];
  authStatus: AuthorizationStatus;
}

function MainPage({placeCards, authStatus}: MainPageProps): JSX.Element {
  const [cityName, setCityName] = useState<string>('Paris');

  const handleCityChange = (newCityName: string) => {
    setCityName(newCityName);
  };

  const cityPlaceCards = placeCards.filter((place) => place.city?.name === cityName);

  const mainClass = cityPlaceCards.length > 0
    ? 'page__main page__main--index'
    : 'page__main page__main--index page__main--index-empty';

  return (
    <div className="page page--gray page--main">
      <Header authStatus={authStatus} />

      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>
        <Locations onCityChange={handleCityChange} />
        <div className="cities">
          {cityPlaceCards && cityPlaceCards.length > 0 ?
            <MainIndex cityPlaceCards={cityPlaceCards} cityName={cityName} /> :
            <MainIndexEmpty cityName={cityName} />}
        </div>
      </main>

    </div>
  );
}

export { MainPage };

