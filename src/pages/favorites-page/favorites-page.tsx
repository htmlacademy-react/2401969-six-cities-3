import { Header } from '../../components/header/header';
import { MainFavorites } from '../../components/main-favotites/main-favorites';
import { MainFavoritesEmpty } from '../../components/main-favotites/main-favorites-empty';
//import { PlaceCard } from '../../components/place-card/place-card';
import { AuthorizationStatus } from '../../const';
import { PlaceCardProps } from '../../mocks/mocks';

type FavoritePageProps = {
  placeCards: PlaceCardProps[];
}

function FavoritesPage({ placeCards }: FavoritePageProps): JSX.Element {
  const favoritePlaceCards = placeCards.filter((card) => card.isFavorite);

  const pageClass = favoritePlaceCards.length > 0
    ? 'page'
    : 'page page--favorites-empty';

  const mainClass = favoritePlaceCards.length > 0
    ? 'page__main page__main--favorites'
    : 'page__main page__main--favorites page__main--favorites-empty';

  return (
    <div className={pageClass}>
      <Header authStatus={AuthorizationStatus.Auth} />


      <main className={mainClass}>
        {favoritePlaceCards && favoritePlaceCards.length > 0 ?
          <MainFavorites favoritePlaceCards={favoritePlaceCards}/> :
          <MainFavoritesEmpty />}
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export { FavoritesPage };
