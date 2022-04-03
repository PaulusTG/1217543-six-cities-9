import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';
import { NewReview } from '../../types/review';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { room } = useAppSelector(({ DATA }) => DATA);

  const [formData, setFromData] = useState<NewReview>({
    rating: 0,
    comment: '',
    roomId: room.id,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const onFieldChange = (evt: { target: { name: string; value: string; }; }) => {
    const { name, value } = evt.target;
    setFromData({ ...formData, [name]: name === 'rating' ? Number(value) : value });

    setIsButtonDisabled(!(formData.comment.length >= 50 && formData.rating !== 0));
  };

  const onSubmit = (newReview: NewReview) => {
    dispatch(addReviewAction(newReview));
  };

  const handleClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const { rating, comment, roomId } = formData;

    if (rating !== 0 && comment !== '' && roomId !== null) {
      onSubmit({
        rating,
        comment,
        roomId,
      });
    }
    setFromData({ rating: 0, comment: '', roomId: null });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={onFieldChange} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onFieldChange} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good" data-testid='label-rating'>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onFieldChange} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onFieldChange} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={onFieldChange} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea onChange={onFieldChange} value={formData.comment} className="reviews__textarea form__textarea" id="review" data-testid='reviews__textarea' name="comment" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          onClick={handleClick}
          className="reviews__submit form__submit button"
          type="button"
          disabled={isButtonDisabled}
          data-testid='reviews__submit'
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
