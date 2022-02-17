import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  placesCount: number;
}

function App({ placesCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage placesCount={placesCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
          <Route
            path={AppRoute.Favorites}
            element={<FavoritesPage />}
          />
        </PrivateRoute>
        <Route
          path={AppRoute.Room}
          element={<OfferPage />}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
