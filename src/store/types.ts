import { ActionCreatorsMapObject, AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from './store';
import { AxiosInstance } from 'axios';

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

export {
  type RootState,
  type AppDispatch,
  type BoundActions,
  createAppAsyncThunk
};
