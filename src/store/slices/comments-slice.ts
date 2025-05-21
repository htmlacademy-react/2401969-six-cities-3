import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReviewProps } from '../../types/comments-types';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';

type CommentsState = {
  comments: ReviewProps[];
};

const initialState: CommentsState = {
  comments: [],
};

const fetchComments = createAsyncThunk<ReviewProps[], string, { extra: AxiosInstance }>(
  'comments/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ReviewProps[]>(`${ApiRoute.Comments}/${offerId}`);
    return data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

const commentsReducer = commentsSlice.reducer;

export { commentsReducer };


