import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/selectors';
import React from 'react';
import { logoutUser } from '../../store/user-slice';

type HeaderNavProps = {
  authStatus: AuthorizationStatus;
}

function HeaderNav({ authStatus }: HeaderNavProps): JSX.Element {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleSignOutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <nav className="header__nav">
      {(() => {
        switch (authStatus) {
          case AuthorizationStatus.Auth:
            return (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">{user?.email}</span>
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
              </ul>
            );

          case AuthorizationStatus.NotAuth:
            return (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            );
          case AuthorizationStatus.Unknown:
            return ('');
        }
      })()}
    </nav>
  );
}

export { HeaderNav };
