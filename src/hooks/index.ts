import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { store } from '../store/store';


type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export {
  useAppDispatch,
  useAppSelector,
};
