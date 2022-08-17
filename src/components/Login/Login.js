import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useState } from 'react';

function Login() {
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
  const { name, value } = e.target;
  setValue((prev) => ({ ...prev, [name]: value }));
  setError((prev) => ({
    ...prev,
    [name]: e.target.validationMessage,
  }));
  };

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
              className='login__input'
              name='email'
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
              className='login__input'
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
        <button type='submit' className='login__button' onClick={handleSubmit}>Войти</button>
        <p className='login__text'>
          Ещё не зарегистрированы?
        <Link className='login-link__text' to='/signup'> Регистрация</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;