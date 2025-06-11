import { Header } from '../../components/header/header';
import { Locations } from '../../components/locations/locations';
import { MainContent } from './components/main-content';
import { MainEmpty } from './components/main-empty';
import { useAppSelector } from '../../store/hooks';
import { selectCityPlaceCards } from '../../store/selectors';
import { useCityName } from '../../hooks/use-city-name';
import { LoadingPage } from '../loading-page/loading-page';
import { offersSelectors } from '../../store/slices/offers-slice';
import { RequestStatus } from '../../const';

function MainPage(): JSX.Element {
  const cityName = useCityName();
  const cityPlaceCards = useAppSelector(selectCityPlaceCards);
  const status = useAppSelector(offersSelectors.status);

  const mainClass = cityPlaceCards.length > 0
    ? 'page__main page__main--index'
    : 'page__main page__main--index page__main--index-empty';

  if (status === RequestStatus.Loading) {
    return <LoadingPage />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

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

