import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { fetchComments, postComment } from '../thunks/comments-thunks';
import type { CommentProps, CommentAuth } from '../../types/comments-types';
import { AppThunkDispatch, RootState } from '../types';
import { createAPI } from '../../services/api';
import { offersReducer } from '../slices/offers-slice';
import { userReducer } from '../slices/user-slice';
import { commentsReducer } from '../slices/comments-slice';

type TestStore = {
  dispatch: AppThunkDispatch;
  getState: () => RootState;
};

describe('Comments thunks', () => {
  const api = createAPI();
  const mockAxios = new MockAdapter(api);
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        offers: offersReducer,
        user: userReducer,
        comments: commentsReducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api
          }
        })
    }) as unknown as TestStore;

    mockAxios.reset();
  });

  describe('fetchComments', () => {
    it('should dispatch fulfilled with comments on success', async () => {
      const mockComments: CommentProps[] = [
        {
          id: '1',
          comment: 'Test comment 1',
          rating: 4,
          date: '2023-01-01',
          user: {
            name: 'User1',
            avatarUrl: '/img/1.png',
            isPro: false,
          },
        },
      ];

      mockAxios.onGet(`${ApiRoute.Comments}/1`).reply(200, mockComments);
      await store.dispatch(fetchComments('1'));

      const state = store.getState().comments;
      expect(state.comments).toEqual(mockComments);
      expect(state.requestStatus).toBe(2);
    });

    it('should handle fetch error', async () => {
      mockAxios.onGet(`${ApiRoute.Comments}/1`).reply(500);
      await store.dispatch(fetchComments('1'));

      const state = store.getState().comments;
      expect(state.comments).toEqual([]);
      expect(state.requestStatus).toBe(0);
    });
  });

  describe('postComment', () => {
    const newComment: CommentAuth = {
      offerId: '1',
      comment: 'New comment',
      rating: 5,
    };

    const mockResponse: CommentProps = {
      id: '2',
      comment: 'New comment',
      rating: 5,
      date: '2023-01-02',
      user: {
        name: 'User2',
        avatarUrl: '/img/2.png',
        isPro: true,
      },
    };

    it('should dispatch fulfilled with new comment on success', async () => {
      mockAxios.onPost(`${ApiRoute.Comments}/1`).reply(200, mockResponse);
      await store.dispatch(postComment(newComment));

      const state = store.getState().comments;
      expect(state.comments).toContainEqual(mockResponse);
      expect(state.responseStatus).toBe(2);
    });

    it('should handle post error', async () => {
      mockAxios.onPost(`${ApiRoute.Comments}/1`).reply(500);
      await store.dispatch(postComment(newComment));

      const state = store.getState().comments;
      expect(state.responseStatus).toBe(3);
    });
  });
});
