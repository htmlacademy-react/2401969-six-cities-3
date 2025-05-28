import { ApiRoute } from '../../const';
import { CommentAuth, CommentProps } from '../../types/comments-types';
import { createAppAsyncThunk } from '../types';

const fetchComments = createAppAsyncThunk<CommentProps[], string>(
  'comments/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<CommentProps[]>(`${ApiRoute.Comments}/${offerId}`);
    return data;
  }
);

const postComment = createAppAsyncThunk<CommentProps, CommentAuth>(
  'comments/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<CommentProps>(`${ApiRoute.Comments}/${offerId}`, { comment, rating});
    return data;
  }
);

export {
  fetchComments,
  postComment,
};
