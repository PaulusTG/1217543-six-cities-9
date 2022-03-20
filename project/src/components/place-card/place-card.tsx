import { MouseEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { Offer } from '../../types/offer';

const ROOM_LOAD_DELAY = 300;

type PlaceCardProps = {
  offer: Offer;
  onPlacesListHover: (placeCardId: number) => void;
};

function PlaceCard({ offer, onPlacesListHover }: PlaceCardProps): JSX.Element {
  const pagePath = useLocation().pathname;

  const { id, previewImage, isPremium, isFavorite,
    price, rating, title, type } = offer;

  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  let articleClassName = '';
  let divClassName = '';

  const imgSize = {
    width: pagePath === AppRoute.Favorites ? '150' : '260',
    height: pagePath === AppRoute.Favorites ? '110' : '200',
  };

  if (pagePath === AppRoute.Favorites) {
    articleClassName = 'favorites__card';
    divClassName = 'favorites';
  } else if (pagePath === AppRoute.Main) {
    articleClassName = 'cities__place-card';
    divClassName = 'cities';
  } else {
    articleClassName = 'near-places__card';
    divClassName = 'near-places';
  }

  const onCardMouseEnter = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onPlacesListHover(id);
    setActiveCard(id);
  };

  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setTimeout(
      () => {
        navigate(`${AppRoute.Room}/${activeCard}`);
      },
      ROOM_LOAD_DELAY,
    );
  };

  return (
    <article
      key={id}
      className={`${articleClassName} place-card`}
      onMouseEnter={onCardMouseEnter}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className={`${divClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoute.Main}>
          <img className="place-card__image" src={previewImage} width={imgSize.width} height={imgSize.height} alt="Place_image" />
        </Link>
      </div>
      <div className={`${pagePath === AppRoute.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link onClick={onClick} to={`${AppRoute.Room}/${activeCard}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
