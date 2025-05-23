import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentAuth, CommentProps } from '../../types/comments-types';
import { AxiosInstance } from 'axios';
import { ApiRoute, MAX_COMMENTS } from '../../const';

type CommentsState = {
  comments: CommentProps[];
  isSending: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isSending: false,
};

const fetchComments = createAsyncThunk<CommentProps[], string, { extra: AxiosInstance }>(
  'comments/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<CommentProps[]>(`${ApiRoute.Comments}/${offerId}`);
    return data;
  }
);

const postComment = createAsyncThunk<CommentProps, CommentAuth, { extra: AxiosInstance}>(
  'comments/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<CommentProps>(`${ApiRoute.Comments}/${offerId}`, { comment, rating});
    return data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload.slice(0, MAX_COMMENTS);
      })
      .addCase(postComment.pending, (state) => {
        state.isSending = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments].slice(0, MAX_COMMENTS);
        state.isSending = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isSending = false;
      });
  }
});

const commentsReducer = commentsSlice.reducer;
const { clearComments } = commentsSlice.actions;

export {
  commentsReducer,
  clearComments,
  fetchComments,
  postComment
};


