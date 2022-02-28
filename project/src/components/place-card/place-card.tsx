import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
  pagePath: string;
};

function PlaceCard({ offer, pagePath }: PlaceCardProps): JSX.Element {
  const { id, previewImage, isPremium, isFavorite,
    price, rating, title, type } = offer;

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const imgSize = {
    width: pagePath === AppRoute.Favorites ? '150' : '260',
    height: pagePath === AppRoute.Favorites ? '110' : '200',
  };

  const onCardMouseOver = () => {
    setActiveCard(id);
  };

  return (
    <article
      key={id}
      className={`${pagePath === AppRoute.Favorites ? 'favorites__card' : 'cities__place-card'} place-card`}
      onMouseOver={onCardMouseOver}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className={`${pagePath === AppRoute.Favorites ? 'favorites' : 'cities'}__image-wrapper place-card__image-wrapper`}>
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
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating {rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${activeCard}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
