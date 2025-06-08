import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { AuthorizationStatus, AppRoute } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { useAppSelector, useOffersActions, useUserActions } from '../../store/hooks';
import { useEffect } from 'react';
import { userSelectors } from '../../store/slices/user-slice';
import { LoadingPage } from '../../pages/loading-page/loading-page';


function App(): JSX.Element {
  const { checkUserStatus } = useUserActions();
  const { fetchOffers, fetchFavorites } = useOffersActions();
  const authStatus = useAppSelector(userSelectors.authStatus);

  useEffect(() => {
    checkUserStatus();
    fetchOffers();
  }, [checkUserStatus, fetchOffers]);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      fetchFavorites();
    }
  }, [fetchFavorites, authStatus]);

  if (authStatus === AuthorizationStatus.Unknown) {
    return <LoadingPage />;
  }

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
              condition={authStatus !== AuthorizationStatus.Auth}
              navigateUrl={AppRoute.Main}
            >
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offers}/:id`}
          element={<OfferPage />}
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
