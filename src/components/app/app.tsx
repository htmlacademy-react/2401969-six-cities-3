import MainPage from '../../pages/main-page/main-page';
//import FavoritesPage from '../../pages/favorite-page/favorites-page';
//import LoginPage from '../../pages/login-page/login-page';
//import OfferPage from '../../pages/offer-page/offer-page';
//import { placeCards } from '../../mocks/mocks';
import { PlaceCardProps } from '../../mocks/mocks';

type AppProps = {
  placeCards: PlaceCardProps[];
}

function App({placeCards }: AppProps): JSX.Element {
  return (
    <MainPage placeCards={placeCards} />
  );
}

export default App;
