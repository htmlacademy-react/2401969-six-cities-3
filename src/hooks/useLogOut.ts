import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/user-slice';
import { AppRoute } from '../const';
import { useAppDispatch } from '../store/hooks';

function useLogOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    void dispatch(logoutUser()).then(() => {
      navigate(AppRoute.Main);
    });
  };

  return { handleSignOutClick};
}

export { useLogOut };
