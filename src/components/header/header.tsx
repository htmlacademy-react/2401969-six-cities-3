import { HeaderNav } from '../header-nav/header-nav';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/selectors';

function Header(): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <HeaderNav authStatus={authStatus} />
        </div>
      </div>
    </header>
  );
}

export { Header };
