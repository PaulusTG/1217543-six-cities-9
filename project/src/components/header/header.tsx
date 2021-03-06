import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction, logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserName } from '../../store/user-process/selectors';

const ROOM_LOAD_DELAY = 300;

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userName = useAppSelector(getUserName);

  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(fetchFavoritesAction());
    setTimeout(
      () => {
        navigate(AppRoute.Favorites);
      },
      ROOM_LOAD_DELAY,
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main} >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus !== AuthorizationStatus.Auth ?
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={AppRoute.Login}
                  >
                    <span className="header__signin">Sign in</span>
                  </Link>
                </li> :
                <>
                  <li className="header__nav-item user">
                    <Link onClick={onClick} className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} data-testid='header__user-name'>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userName}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Login}
                      onClick={() => dispatch(logoutAction())}
                    >
                      <span className="header__signout" data-testid='header__signout'>Sign out</span>
                    </Link>
                  </li>
                </>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
