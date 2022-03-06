import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { Review } from '../../types/review';

type AppProps = {
  placesCount: number;
  offers: Offer[];
  cities: City[];
  reviews: Review[];
}

function App({ placesCount, offers, cities, reviews }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              placesCount={placesCount}
              offers={offers}
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
                offers={offers}
                pagePath={AppRoute.Favorites}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<OfferPage offers={offers} reviews={reviews} />}
        >
          <Route
            path=':id'
            element={<OfferPage offers={offers} reviews={reviews} />}
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
