import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { useLogOut } from '../../hooks/useLogOut';
import { userSelectors } from '../../store/slices/user-slice';

function HeaderNav(): JSX.Element {
  const user = useAppSelector(userSelectors.user);
  const { handleSignOutClick } = useLogOut();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {user ? (
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper" />
                <span className="header__user-name user__name">{user.email}</span>
                <span className="header__favorite-count">3</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a
                className="header__nav-link"
                href="#"
                onClick={handleSignOutClick}
              >
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export { HeaderNav };
