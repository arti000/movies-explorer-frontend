import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useState } from 'react';

function Register() {
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [value, setValue] = useState({
    name: '',
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
    <section className='register'>
      <form className='register__form'>
        <Link to='/' className='register__link'>
          <img className='register__logo' src={logo} alt='logo' />
        </Link>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <div className='register-fieldsets__wrapper'>
            <fieldset className='register__fieldset'>
              <label className='register__label'>Имя</label>
              <input
                type='text'
                className='register__input'
                name='name'
                required
                minLength={2}
                maxLength={100}
                value={value.name}
                onChange={handleChange}
              />
              {error.name && (
                <span className='register__span-error'>{error.name}</span>
              )}
            </fieldset>
          <fieldset className='register__fieldset'>
            <label className='register__label'>E-mail</label>
            <input
              type='email'
              className='register__input'
              name='email'
              required
              value={value.email}
              onChange={handleChange}
            />
            <span className='register__span-error'>{error.email}</span>
          </fieldset>
          <fieldset className='register__fieldset'>
            <label className='register__label'>Пароль</label>
            <input
              type='password'
              className='register__input'
              name='password'
              value={value.password}
              required
              minLength={8}
              onChange={handleChange}
            />
            {error.password && (
              <span className='register__span-error'>{error.password}</span>
            )}
          </fieldset>
        </div>
        <button type='submit' className='register__button' onClick={handleSubmit}>Зарегистрироваться</button>
        <p className='register__text'>
          Уже зарегистрированы?
        <Link className='register-link__text' to='/signin'> Войти</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;