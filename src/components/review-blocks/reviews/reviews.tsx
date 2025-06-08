import { Review } from '../review/review';
import { CommentProps } from '../../../types/comments-types';
import { memo } from 'react';
import { MAX_COMMENTS } from '../../../const';


type CommentsProps = {
  comments: CommentProps[];
}

const Reviews = memo(({comments}:CommentsProps): JSX.Element => {
  const displayedComments = comments.slice(0, MAX_COMMENTS);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {displayedComments.map((item) => (
          <Review
            key={item.id}
            {...item}
          />
        ))}
      </ul>
    </>
  );
});

Reviews.displayName = 'Reviews';

export { Reviews };
