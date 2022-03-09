import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { cities } from '../../mocks/cities';
import { changeCity, fillOffers } from '../../store/actions';

type LocationsListProp = {
  currentCity: string;
};

function LocationsList({ currentCity }: LocationsListProp): JSX.Element {
  const dispatch = useAppDispatch();

  const onCityClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(evt.currentTarget.textContent));
    dispatch(fillOffers());
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={`${city.name}`} className="locations__item">
          <a
            onClick={onCityClick}
            className={`locations__item-link tabs__item ${city.name === currentCity ? 'tabs__item--active' : ''}`}
            href="/"
          >
            <span>{city.name}</span>
          </a>
        </li>))}
    </ul>
  );
}

export default LocationsList;