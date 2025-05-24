import { Header } from '../../components/header/header';
import { useAppSelector } from '../../store/hooks';
import { selectFavoritesCards } from '../../store/selectors';
import { FavoritesContent } from './components/favorites-content';
import { FavoritesEmpty } from './components/favorites-empty';
//import { PlaceCardProps } from '../../types/offers-types';


function FavoritesPage(): JSX.Element {
  const favoriteCards = useAppSelector(selectFavoritesCards);

  const pageClass = favoriteCards.length > 0
    ? 'page'
    : 'page page--favorites-empty';

  const mainClass = favoriteCards.length > 0
    ? 'page__main page__main--favorites'
    : 'page__main page__main--favorites page__main--favorites-empty';

  return (
    <div className={pageClass}>
      <Header />


      <main className={mainClass}>
        {favoriteCards && favoriteCards.length > 0 ?
          <FavoritesContent favoriteCards={favoriteCards}/> :
          <FavoritesEmpty />}
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
