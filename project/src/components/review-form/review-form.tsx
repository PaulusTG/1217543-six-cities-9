import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RatingStars } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { errorHandle } from '../../services/error-handle';
import { addReviewAction } from '../../store/api-actions';
import { getRoom } from '../../store/data-process/selectors';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getRoom);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const submitButton: HTMLButtonElement | null =
      document.querySelector('.form__submit');
    rating !== 0 && comment.length >= MIN_COMMENT_LENGTH
      ? ((submitButton as HTMLButtonElement).disabled = false)
      : ((submitButton as HTMLButtonElement).disabled = true);
  }, [rating, comment]);

  const handlerRadioClick = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setRating(Number(value));
  };

  const handlerTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    const { value } = evt.target;
    setComment(value);
  };

  const fieldset: HTMLFieldSetElement | null =
    document.querySelector('.reviews__fieldset');

  const sendReview = async () => {
    try {
      await dispatch(addReviewAction({ roomId: room.id, comment, rating }));
      setComment('');
      setRating(0);
      (fieldset as HTMLFieldSetElement).disabled = false;
    } catch (error) {
      errorHandle(error);
      (fieldset as HTMLFieldSetElement).disabled = false;
    }
  };

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    (fieldset as HTMLFieldSetElement).disabled = true;
    sendReview();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handlerFormSubmit}>
      <fieldset className='reviews__fieldset' style={{ border: 'none' }}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input onChange={handlerRadioClick} className="form__rating-input visually-hidden" name="rating" value={RatingStars.five} id="5-stars" type="radio" checked={rating === RatingStars.five} />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handlerRadioClick} className="form__rating-input visually-hidden" name="rating" value={RatingStars.four} id="4-stars" type="radio" checked={rating === RatingStars.four} />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good" data-testid='label-rating'>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handlerRadioClick} className="form__rating-input visually-hidden" name="rating" value={RatingStars.three} id="3-stars" type="radio" checked={rating === RatingStars.three} />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handlerRadioClick} className="form__rating-input visually-hidden" name="rating" value={RatingStars.two} id="2-stars" type="radio" checked={rating === RatingStars.two} />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input onChange={handlerRadioClick} className="form__rating-input visually-hidden" name="rating" value={RatingStars.one} id="1-star" type="radio" checked={rating === RatingStars.one} />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea onChange={handlerTextareaChange} value={comment} className="reviews__textarea form__textarea" id="review" data-testid='reviews__textarea' name="comment" minLength={MIN_COMMENT_LENGTH} maxLength={MAX_COMMENT_LENGTH} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled
            data-testid='reviews__submit'
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default ReviewForm;
