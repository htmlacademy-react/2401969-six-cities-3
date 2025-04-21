import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';

type HeaderNavProps = {
  authStatus: AuthorizationStatus;
}

function HeaderNav({ authStatus }: HeaderNavProps): JSX.Element {
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
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={AppRoute.Login}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
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
