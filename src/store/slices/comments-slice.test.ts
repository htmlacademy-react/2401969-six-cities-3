import { describe, it, expect } from 'vitest';
import { RequestStatus, ResponseStatus } from '../../const';
import { CommentProps } from '../../types/comments-types';
import { commentsReducer, commentsActions, commentsSelectors } from './comments-slice';

type CommentsState = {
  comments: CommentProps[];
  requestStatus: RequestStatus;
  responseStatus: ResponseStatus;
};

const mockComment: CommentProps = {
  id: '1',
  date: '2023-01-01',
  user: {
    name: 'Test User',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: false
  },
  comment: 'Test comment',
  rating: 5
};

describe('comments-slice', () => {
  const initialState: CommentsState = {
    comments: [],
    requestStatus: RequestStatus.Idle,
    responseStatus: ResponseStatus.Idle,
  };

  describe('reducers', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = commentsReducer(undefined, emptyAction);
      expect(result).toEqual(initialState);
    });

    it('should not modify state on unknown action', () => {
      const state = {
        comments: [mockComment],
        requestStatus: RequestStatus.Success,
        responseStatus: ResponseStatus.Success
      };
      const emptyAction = { type: 'unknown_action' };
      const result = commentsReducer(state, emptyAction);
      expect(result).toEqual(state);
    });

    it('should clear comments with clearComments action', () => {
      const state = {
        comments: [mockComment],
        requestStatus: RequestStatus.Success,
        responseStatus: ResponseStatus.Success
      };
      const result = commentsReducer(state, commentsActions.clearComments());
      expect(result.comments).toEqual([]);
      expect(result.requestStatus).toBe(RequestStatus.Success); // Другие поля не должны меняться
      expect(result.responseStatus).toBe(ResponseStatus.Success);
    });

    it('should not modify other state fields when clearing comments', () => {
      const state = {
        comments: [mockComment],
        requestStatus: RequestStatus.Loading,
        responseStatus: ResponseStatus.Sending
      };
      const result = commentsReducer(state, commentsActions.clearComments());
      expect(result.comments).toEqual([]);
      expect(result.requestStatus).toBe(RequestStatus.Loading);
      expect(result.responseStatus).toBe(ResponseStatus.Sending);
    });
  });

  describe('selectors', () => {
    it('should return comments', () => {
      const state = {
        ...initialState,
        comments: [mockComment]
      };
      expect(commentsSelectors.comments.unwrapped(state)).toEqual([mockComment]);
    });

    it('should return empty array if no comments', () => {
      expect(commentsSelectors.comments.unwrapped(initialState)).toEqual([]);
    });

    it('should return response status', () => {
      const state = {
        ...initialState,
        responseStatus: ResponseStatus.Success
      };
      expect(commentsSelectors.responseStatus.unwrapped(state)).toBe(ResponseStatus.Success);
    });

    it('should return idle status by default', () => {
      expect(commentsSelectors.responseStatus.unwrapped(initialState)).toBe(ResponseStatus.Idle);
    });
  });
});
