import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { userActions } from './slices/user-slice';
import { offersActions } from './slices/offers-slice';
import { commentsActions } from './slices/comments-slice';
import { AppDispatch, BoundActions, RootState } from './types';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useActionCreators = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

const useUserActions = () => useActionCreators(userActions);
const useOffersActions = () => useActionCreators(offersActions);
const useCommentsAction = () => useActionCreators(commentsActions);

export {
  useAppDispatch,
  useAppSelector,
  useActionCreators,
  useUserActions,
  useOffersActions,
  useCommentsAction,
};
