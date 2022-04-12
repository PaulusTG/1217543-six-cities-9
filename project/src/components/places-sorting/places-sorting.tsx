import { MouseEvent, useState } from 'react';
import { SortType } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType, sortOffers } from '../../store/data-process/data-process';
import { getSortType } from '../../store/data-process/selectors';

function PlacesSorting(): JSX.Element {
  const sortType = useAppSelector(getSortType);
  const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const sortTypeClickHandle = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    dispatch(changeSortType(evt.currentTarget.textContent));
    dispatch(sortOffers());
    setIsOptionsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={() => setIsOptionsOpened(!isOptionsOpened)} className="places__sorting-type" tabIndex={0}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsOpened ? 'places__options--opened' : ''}`} data-testid='places__options'>
        <li onClick={sortTypeClickHandle} className={`places__option ${sortType === SortType.Popular ? 'places__option--active' : ''}`} data-testid='places__option' tabIndex={0}>{SortType.Popular}</li>
        <li onClick={sortTypeClickHandle} className={`places__option ${sortType === SortType.LowToHigh ? 'places__option--active' : ''}`} data-testid='places__option' tabIndex={0}>{SortType.LowToHigh}</li>
        <li onClick={sortTypeClickHandle} className={`places__option ${sortType === SortType.HighToLow ? 'places__option--active' : ''}`} data-testid='places__option' tabIndex={0}>{SortType.HighToLow}</li>
        <li onClick={sortTypeClickHandle} className={`places__option ${sortType === SortType.TopRated ? 'places__option--active' : ''}`} data-testid='places__option' tabIndex={0}>{SortType.TopRated}</li>
      </ul>
    </form>
  );
}

export default PlacesSorting;
