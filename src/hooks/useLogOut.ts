import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/user-slice';
import { AppRoute } from '../const';
import { useAppDispatch } from '../store/hooks';
import { isPrivateRout } from '../utils';

function useLogOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    void dispatch(logoutUser()).then(() => {
      if (isPrivateRout(location.pathname)) {
        navigate(AppRoute.Login, {
          replace: true,
          state: { from: location.pathname }
        });
      }
    });
  };

  return { handleSignOutClick};
}

export { useLogOut };
