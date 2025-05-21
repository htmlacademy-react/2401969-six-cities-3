import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/user-slice';
import { AppRoute } from '../const';
import { useAppDispatch } from '../store/hooks';

function useLogOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    await dispatch(logoutUser());
    navigate(AppRoute.Main);
  };

  return { handleSignOutClick};
}

export { useLogOut };
