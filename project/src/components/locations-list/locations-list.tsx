import { MouseEvent } from 'react';
import { CITIES } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { changeCity, setOffers } from '../../store/actions';

type LocationsListProp = {
  currentCity: string;
};

function LocationsList({ currentCity }: LocationsListProp): JSX.Element {
  const dispatch = useAppDispatch();

  const onCityClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(evt.currentTarget.textContent));
    dispatch(setOffers());
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
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
