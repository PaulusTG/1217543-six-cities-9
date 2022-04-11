import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, CITIES } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { changeCity, setOffers } from '../../store/data-process/data-process';
import { AuthData } from '../../types/auth-data';
import { City } from '../../types/city';
import { getRandomNumber } from '../../utils/utils';

function LoginPage(): JSX.Element {
  const randomCity: City = CITIES[getRandomNumber(0, 5)];
  const { name } = randomCity;

  const handleLinkClick = (): void => {
    dispatch(changeCity(name));
    dispatch(setOffers());
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const { value } = evt.target;
    setEmail(value);
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const { value } = evt.target;
    setPassword(value);
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (email !== '' && password !== '' && !email.includes(' ') && !password.includes(' ')) {
      onSubmit({
        email,
        password,
      });
      navigate(AppRoute.Main);
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Login</h1>
            <form
              className="login__form form"
              action="#"
              method='post'
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor='email' className="visually-hidden">E-mail</label>
                <input
                  id='email'
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor='password' className="visually-hidden">Password</label>
                <input
                  id='password'
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid='login__submit'
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={handleLinkClick}>
                <span>{name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
