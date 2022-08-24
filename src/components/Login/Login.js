import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useState, useEffect } from 'react';
import classNames from 'classnames';

function Login({ onLogin, authStatusMessage, userAuth }) {
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const [isValidForm, setIsValidForm] = useState(false);

  function handleSubmit(e) {
    if (!value.password || !value.email) {
      return;
    }
    return onLogin(value);
  }

  function handleChange(e) {
  const { name, value } = e.target;
  setValue((prev) => ({ ...prev, [name]: value }));
  setError((prev) => ({
    ...prev,
    [name]: e.target.validationMessage,
  }));
  };

  const classSaveButton = classNames(`login__button`, {
    'login__button_disable': !isValidForm,
    'login__button_disable login__button_error-text': !userAuth,
  });

  useEffect(() => {
    if (error.email || error.password) {
        return setIsValidForm(false);
    } 
    if (!value.password || !value.email) {
        return setIsValidForm(false);
    }
    setIsValidForm(true);
  }, [error, value]);

  return (
    <section className='login'>
      <form className='login__form'>
        <Link to='/' className='login__link'>
          <img className='login__logo' src={logo} alt='logo' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
        <div className='login-fieldsets__wrapper'>
          <fieldset className='login__fieldset'>
            <label className='login__label'>E-mail</label>
            <input
              type='email'
              className={`login__input ${error.email ? 'error' : ''}`}
              name='email'
              pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
              required
              value={value.email}
              onChange={handleChange}
            />
            <span className='login__span-error'>{error.email}</span>
          </fieldset>
          <fieldset className='login__fieldset'>
            <label className='login__label'>Пароль</label>
            <input
              type='password'
              className={`login__input ${error.password ? 'error' : ''}`}
              name='password'
              value={value.password}
              required
              minLength={8}
              onChange={handleChange}
            />
            {error.password && (
              <span className='login__span-error'>{error.password}</span>
            )}
          </fieldset>
        </div>
        {!userAuth && <span className='login__error'>{authStatusMessage}</span>}
        <button 
          type='submit' 
          className={classSaveButton} 
          onClick={handleSubmit}
          disabled={!isValidForm}
          >Войти</button>
        <p className='login__text'>
          Ещё не зарегистрированы?
        <Link className='login-link__text' to='/signup'> Регистрация</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;