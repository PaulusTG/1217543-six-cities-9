import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getIsDataLoaded } from '../../store/data-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getIsDataLoaded);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainPage />
        }
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute
            authorizationStatus={authorizationStatus}
          >
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Room}
        element={<OfferPage />}
      >
        <Route
          path=':id'
          element={<OfferPage />}
        />
      </Route>
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
