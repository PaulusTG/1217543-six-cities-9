import { MouseEvent } from 'react';
import { CITIES } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { changeCity, setOffers } from '../../store/data-process/data-process';

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
    <ul className="locations__list tabs__list" data-testid='locations__list'>
      {CITIES.map((city) => (
        <li key={`${city.name}`} className="locations__item">
          <a
            onClick={onCityClick}
            className={`locations__item-link  ${city.name === currentCity ? 'tabs__item--active' : ''}`}
            href="/"
            data-testid='tabs__item'
          >
            <span>{city.name}</span>
          </a>
        </li>))}
    </ul>
  );
}

export default LocationsList;
