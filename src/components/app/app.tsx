import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { AuthorizationStatus, AppRoute } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { PlaceCardProps } from '../../mocks/mocks';

type AppProps = {
  placeCards: PlaceCardProps[];
}

function App({placeCards }: AppProps): JSX.Element {

  const authStatus = AuthorizationStatus.Auth;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage placeCards={placeCards} authStatus={authStatus}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={`${AppRoute.Offers}/:id`}
          element={<OfferPage authStatus={authStatus} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              condition={authStatus === AuthorizationStatus.Auth}
              navigateUrl={AppRoute.Login}
            >
              <FavoritesPage />
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
