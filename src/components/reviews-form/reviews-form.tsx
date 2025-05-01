import { useState, ChangeEvent, Fragment } from 'react';
import { RATING_TITLES } from '../../const';

function ReviewsForm(): JSX.Element {

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

  const { rating, reviewText } = formData;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({length: 5}, (_, i) => (
          <Fragment key={`${5 - i}-stars`}>
            <input className="form__rating-input visually-hidden"
              name="rating"
              value={5 - i}
              id={`${5 - i}-stars`}
              type="radio"
              checked={5 - i === rating}
              onChange={handleChange}
            />
            <label htmlFor={`${5 - i}-stars`}
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
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={reviewText.length <= 50 || !rating}
        >Submit
        </button>
      </div>
    </form>
  );
}

export { ReviewsForm };
