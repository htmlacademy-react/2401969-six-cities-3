import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { useUserActions } from '../store/hooks';
import { isPrivateRout } from '../utils';

function useLogOut() {
  const { logoutUser } = useUserActions();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    void logoutUser()
      .unwrap()
      .then(() => {
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
