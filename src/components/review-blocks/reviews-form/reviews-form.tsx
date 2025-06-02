import { useState, ChangeEvent, Fragment, FormEvent, memo } from 'react';
import { MAX_RATING, MIN_REVIEW_LENGTH, RATING_TITLES, } from '../../../const';
import { useCommentsAction } from '../../../store/hooks';

type ReviewsFormProps = {
  offerId: string | undefined;
}

const ReviewsForm = memo(({ offerId }: ReviewsFormProps): JSX.Element => {
  const { postComment } = useCommentsAction();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState<{
    rating: number | null;
    reviewText: string;
  }>({rating: null, reviewText: ''});

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value
    });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!offerId || isSending || !formData.rating || formData.reviewText.length < MIN_REVIEW_LENGTH) {
      return;
    }

    setIsSending(true);
    try {
      void postComment({
        offerId,
        comment: formData.reviewText,
        rating: formData.rating,
      }).unwrap();
      setFormData({ rating: null, reviewText: ' '});
    } finally {
      setIsSending(false);
    }
  };

  const { rating, reviewText } = formData;

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({length: MAX_RATING}, (_, i) => (
          <Fragment key={`${5 - i}-stars`}>
            <input className="form__rating-input visually-hidden"
              name="rating"
              value={MAX_RATING - i}
              id={`${MAX_RATING - i}-stars`}
              type="radio"
              checked={MAX_RATING - i === rating}
              onChange={handleChange}
            />
            <label htmlFor={`${MAX_RATING - i}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[i]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="reviewText"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={reviewText.length <= MIN_REVIEW_LENGTH || !rating || isSending}
        >{isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
});

ReviewsForm.displayName = 'ReviewsForm';

export { ReviewsForm };
