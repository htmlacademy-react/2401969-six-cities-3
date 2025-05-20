import { FormEvent, useRef } from 'react';
import { Header } from '../../components/header/header';
import { useAppDispatch } from '../../store/hooks';
import { UserAuth } from '../../mocks/user';
import { loginUser } from '../../store/user-slice';

function LoginPage(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = formRef.current;
    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as UserAuth;

    dispatch(loginUser(data));
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" ref={formRef} onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { LoginPage };
