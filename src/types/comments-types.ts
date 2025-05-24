type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  }

type CommentProps = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

type NewComment = {
  comment: string;
  rating: number;
}

type CommentAuth = NewComment & {
  offerId: string;
};

export {
  type CommentProps,
  type NewComment,
  type CommentAuth,
};
