import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/data-process/selectors';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Header from '../header/header';
import PlacesList from '../places-list/places-list';

function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector(getFavorites);

  return (
    <div className="page">
      <Header />
      <main className={`page__main page__main--favorites ${favorites.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {favorites.length === 0 ?
            <FavoritesEmpty /> :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {CITIES.map((city) => {
                  const groupedFavorites = favorites.filter((item) => item.city.name === city.name);
                  if (groupedFavorites.length > 0) {
                    return (
                      <li key={city.name} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <Link className="locations__item-link" to={AppRoute.Main}>
                              <span>{city.name}</span>
                            </Link>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <PlacesList
                            offers={groupedFavorites}
                            onPlacesListHover={() => null}
                          />
                        </div>
                      </li>);
                  }
                  return '';
                })}
              </ul>
            </section>}
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
