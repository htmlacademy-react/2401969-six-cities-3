import { Review } from '../review/review';
import { CommentProps } from '../../../types/comments-types';


type CommentsProps = {
  comments: CommentProps[];
}

function Reviews({comments}:CommentsProps): JSX.Element {
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
