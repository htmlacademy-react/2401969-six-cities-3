import { Review } from '../review/review';
import { ReviewsForm } from '../reviews-form/reviews-form';
//import { ReviewProps } from '../../mocks/mocks';
import { reviews } from '../../mocks/mocks';


function ReviewsList(): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((item) => (
          <Review
            key={item.id}
            {...item}
          />
        ))}
      </ul>
      <ReviewsForm />
    </section>
  );
}

export { ReviewsList };
