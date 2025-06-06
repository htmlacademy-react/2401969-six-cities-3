import { Review } from '../review/review';
import { CommentProps } from '../../../types/comments-types';
import { memo } from 'react';


type CommentsProps = {
  comments: CommentProps[];
}

const Reviews = memo(({comments}:CommentsProps): JSX.Element => (
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
));

Reviews.displayName = 'Reviews';

export { Reviews };
