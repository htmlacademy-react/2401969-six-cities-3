import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { useLogOut } from '../../hooks/use-log-out';
import { userSelectors } from '../../store/slices/user-slice';
import { memo } from 'react';
import { offersSelectors } from '../../store/slices/offers-slice';

const HeaderNav = memo((): JSX.Element => {
  const user = useAppSelector(userSelectors.user);
  const { handleSignOutClick } = useLogOut();
  const location = useLocation();
  const favoriteCount = useAppSelector(offersSelectors.favoritesCards).length;

  return (
    <nav className="header__nav" data-testid="header-nav">
      <ul className="header__nav-list">
        {user ? (
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img className="user__avatar" src={user.avatarUrl} width="20" height="20" alt="User avatar" />
                </div>
                <span className="header__user-name user__name">{user.email}</span>
                <span className="header__favorite-count">{favoriteCount}</span>
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
              state={{ from: location.pathname }}

            >
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
});

HeaderNav.displayName = 'HeaderNav';

export { HeaderNav };
