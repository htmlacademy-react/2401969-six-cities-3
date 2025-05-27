import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { AuthorizationStatus, AppRoute } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/selectors';
import { useEffect } from 'react';
import { checkUserStatus } from '../../store/slices/user-slice';
import { fetchFavorites, fetchOffers } from '../../store/slices/offers-slice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    dispatch(checkUserStatus());
    dispatch(fetchOffers());
    dispatch(fetchFavorites());
  }, [dispatch]);

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
