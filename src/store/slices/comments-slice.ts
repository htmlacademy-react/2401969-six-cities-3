import { createSlice } from '@reduxjs/toolkit';
import { CommentProps } from '../../types/comments-types';

import { MAX_COMMENTS, RequestStatus, ResponseStatus } from '../../const';
import { fetchComments, postComment } from '../thunks/comments-thunks';

type CommentsState = {
  comments: CommentProps[];
  requestStatus: RequestStatus;
  responseStatus: ResponseStatus;
};

const initialState: CommentsState = {
  comments: [],
  requestStatus: RequestStatus.Idle,
  responseStatus: ResponseStatus.Idle,
};

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
        state.requestStatus = RequestStatus.Success;
        state.comments = action.payload.slice(0, MAX_COMMENTS);
      })
      .addCase(postComment.pending, (state) => {
        state.responseStatus = ResponseStatus.Sending;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.responseStatus = ResponseStatus.Success;
        state.comments = [action.payload, ...state.comments].slice(0, MAX_COMMENTS);
      })
      .addCase(postComment.rejected, (state) => {
        state.responseStatus = ResponseStatus.Failed;
      });
  },
  selectors: {
    comments: (state) => state.comments,
    responseStatus: (state) => state.responseStatus,
  }
});

const commentsReducer = commentsSlice.reducer;
const commentsActions = {
  ...commentsSlice.actions,
  fetchComments,
  postComment,
};
const commentsSelectors = commentsSlice.selectors;

export {
  commentsReducer,
  commentsActions,
  commentsSelectors
};


