import { Review } from '../../types/review';

type ReviewsItemProps = {
  review: Review;
};

function ReviewsItem({ review }: ReviewsItemProps): JSX.Element {
  const { comment, date, rating, user } = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" data-testid='reviews__avatar' />
        </div>
        <span className="reviews__user-name" data-testid='reviews__user-name'>
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating" data-testid='reviews__rating'>
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text" data-testid='reviews__text'>
          {comment}
        </p>
        <time className="reviews__time" dateTime={date} data-testid='reviews__time'>
          {new Intl.DateTimeFormat('ru-RU', {
            month: 'long',
            year: 'numeric',
          }).format(new Date(date))}
        </time>
      </div>
    </li>
  );
}

export default ReviewsItem;
