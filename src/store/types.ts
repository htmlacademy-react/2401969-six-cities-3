import { Action, ActionCreatorsMapObject, AsyncThunk, createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { store } from './store';
import { AxiosInstance } from 'axios';
import { createAPI } from '../services/api';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
  ? BoundAsyncThunk<Actions[key]>
  : Actions[key]
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (...args: Parameters<Thunk>) =>
  ReturnType<ReturnType<Thunk>>;

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  extra: AxiosInstance;
}>();

type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action<string>>;

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export {
  type RootState,
  type AppDispatch,
  type BoundActions,
  createAppAsyncThunk,
  type AppThunkDispatch,
  extractActionsTypes,
};
