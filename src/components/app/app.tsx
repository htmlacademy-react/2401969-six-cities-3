import MainPage from '../../pages/main-page/main-page';
//import FavoritesPage from '../../pages/favorite-page/favorites-page';
//import LoginPage from '../../pages/login-page/login-page';
//import OfferPage from '../../pages/offer-page/offer-page';

type AppProps = {
  cardsCount: number;
}

function App({cardsCount }: AppProps): JSX.Element {
  return (
    <MainPage cardsCount={cardsCount} />
  );
}

export default App;
