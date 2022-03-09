import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { City } from '../../types/city';
import { Review } from '../../types/review';

type AppProps = {
  cities: City[];
  reviews: Review[];
}

function App({ cities, reviews }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              cities={cities}
              pagePath={AppRoute.Main}
            />
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
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesPage
                pagePath={AppRoute.Favorites}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<OfferPage reviews={reviews} />}
        >
          <Route
            path=':id'
            element={<OfferPage reviews={reviews} />}
          />
        </Route>
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
