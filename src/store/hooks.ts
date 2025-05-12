import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { store } from '../store/store';


type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  type RootState,
  type AppDispatch,
  useAppDispatch,
  useAppSelector,
};
