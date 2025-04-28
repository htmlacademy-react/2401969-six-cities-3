import { Review } from '../review/review';
import { ReviewProps } from '../../mocks/mock-comments';
//import { comments } from '../../mocks/mock-comments';

type ReviewsProps = {
  comments: ReviewProps[];
}

function Reviews({comments}:ReviewsProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((item) => (
          <Review
            key={item.id}
            {...item}
          />
        ))}
      </ul>
    </>


  );
}

export { Reviews };
