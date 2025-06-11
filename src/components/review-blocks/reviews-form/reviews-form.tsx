import { useState, ChangeEvent, Fragment, FormEvent, memo } from 'react';
import { MAX_RATING, MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH, RATING_TITLES, } from '../../../const';
import { useCommentsAction } from '../../../store/hooks';
import { toast } from 'react-toastify';

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

  const { rating, reviewText } = formData;

  const handleSubmit = async (evt: FormEvent): Promise<void> => {
    evt.preventDefault();
    if (!offerId || isSending || !rating ||
      reviewText.length < MIN_REVIEW_LENGTH ||
      reviewText.length > MAX_REVIEW_LENGTH
    ) {
      return;
    }

    setIsSending(true);
    try {
      await postComment({
        offerId,
        comment: reviewText,
        rating: rating,
      }).unwrap();
      setFormData({ rating: null, reviewText: ''});
      toast.success('Review successfully posted!');
    } catch {
      toast.error('Failed to send review. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value
    });
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={(evt) => void handleSubmit(evt)}
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
              disabled={isSending}
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
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>. Max {MAX_REVIEW_LENGTH} characters.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            reviewText.length <= MIN_REVIEW_LENGTH ||
            reviewText.length > MAX_REVIEW_LENGTH ||
            !rating ||
            isSending
          }
        >{isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
});

ReviewsForm.displayName = 'ReviewsForm';

export { ReviewsForm };
