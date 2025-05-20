import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { AuthorizationStatus, AppRoute } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { PlaceCardProps } from '../../types/offers-types';
import { ReviewProps } from '../../types/comments-types';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/selectors';

type AppProps = {
  favoriteCards: PlaceCardProps[];
  comments: ReviewProps[];
}

function App({ favoriteCards, comments }: AppProps): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${AppRoute.Main}:city?`}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              condition={authStatus === AuthorizationStatus.NotAuth}
              navigateUrl={AppRoute.Main}
            >
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offers}/:id`}
          element={<OfferPage comments={comments} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              condition={authStatus === AuthorizationStatus.Auth}
              navigateUrl={AppRoute.Login}
            >
              <FavoritesPage favoriteCards={favoriteCards} />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
