import { Header } from '../../components/header/header';
import { Locations } from '../../components/locations/locations';
import { MainContent } from './components/main-content';
import { MainEmpty } from './components/main-empty';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { selectCityPlaceCards } from '../../store/selectors';
import { useCityName } from '../../hooks/useCityName';

type MainPageProps = {
  authStatus: AuthorizationStatus;
}

function MainPage({ authStatus }: MainPageProps): JSX.Element {
  const cityName = useCityName();
  const cityPlaceCards = useAppSelector(selectCityPlaceCards);

  const mainClass = cityPlaceCards.length > 0
    ? 'page__main page__main--index'
    : 'page__main page__main--index page__main--index-empty';

  return (
    <div className="page page--gray page--main">
      <Header authStatus={authStatus} />

      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>
        <Locations
          activeCity={cityName}
        />
        <div className="cities">
          {cityPlaceCards && cityPlaceCards.length > 0 ?
            <MainContent cityPlaceCards={cityPlaceCards} cityName={cityName} /> :
            <MainEmpty cityName={cityName} />}
        </div>
      </main>

    </div>
  );
}

export { MainPage };

