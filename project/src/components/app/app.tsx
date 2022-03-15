import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { Review } from '../../types/review';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';

type AppProps = {
  reviews: Review[];
}

function App({ reviews }: AppProps): JSX.Element {
  const { authorizationStatus, isDataLoaded } = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
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
              authorizationStatus={authorizationStatus}
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
