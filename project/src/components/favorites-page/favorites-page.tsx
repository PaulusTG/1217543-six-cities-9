import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import Header from '../header/header';
import PlacesList from '../places-list/places-list';

type FavoritesPageProps = {
  pagePath: string;
}

function FavoritesPage({ pagePath }: FavoritesPageProps): JSX.Element {
  const { city, offers } = useAppSelector((state) => state);
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <PlacesList
                    offers={favoritesOffers}
                    pagePath={pagePath}
                    onPlacesListHover={() => null}
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
