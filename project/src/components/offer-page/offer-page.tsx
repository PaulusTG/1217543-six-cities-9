import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { dispatchOfferData } from '../../utils/dispatch-offer-data';
import { useParams, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import { setFavoritesAction } from '../../store/api-actions';
import { loadRoom, setOffers } from '../../store/data-process/data-process';

const ROOM_LOAD_DELAY = 300;
const IMAGE_MAX_COUNT = 6;

function OfferPage(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { offers, room, reviews, offersNearby } = useAppSelector(({ DATA }) => DATA);
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);

  if (!offers.find((offer) => offer.id === Number(params.id))) {
    navigate(AppRoute.NotFound);
  } /*else if (room.id !== Number(params.id)) {
    dispatchOfferData(Number(params.id));
  }*/

  const { id, isPremium, isFavorite, price, rating,
    title, type, images, bedrooms, maxAdults,
    goods, host, description, city, location } = room;

  const points = offersNearby.map((elem) => elem.location);
  points.push(location);

  const mapStyle = { width: '1144px', margin: '0 auto 50px auto' };

  const bookmarkClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    dispatch(setFavoritesAction({ ...room, id, isFavorite: !isFavorite }));
    setTimeout(
      () => {
        dispatch(setOffers());
        dispatch(loadRoom({ ...room, isFavorite: !isFavorite }));
      },
      ROOM_LOAD_DELAY,
    );
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, IMAGE_MAX_COUNT).map((image, key) => {
                const keyValue = `${key}_${image}`;
                return (
                  <div key={keyValue} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo_studio" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  onClick={bookmarkClickHandle}
                  className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active' : ''}`}
                  type="button"
                  data-testid='bookmark-button'
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type ? type[0].toUpperCase() + type.slice(1) : ''}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, key) => {
                    const keyValue = `${key}_${good}`;
                    return (
                      <li key={keyValue} className="property__inside-item">
                        {good}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
              </section>
            </div>
          </div>
          < Map
            city={city}
            points={points}
            selectedPoint={room.location}
            mapClassName="property__map"
            style={mapStyle}
          />
        </section>
        <div className="container">
          <section className="near-places places" data-testid='near-places'>
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList offers={offersNearby} onPlacesListHover={() => null} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
