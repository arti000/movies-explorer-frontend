import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useState, useEffect } from 'react';
import classNames from 'classnames';

function Register({onRegister, authStatusMessage, userAuth }) {
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

  const [isValidForm, setIsValidForm] = useState(false);

  function handleSubmit(e) {
    if (!value.name || !value.password || !value.email) {
      return;
    }
    return onRegister(value);
  }
  
  function handleChange(e) {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({
      ...prev,
      [name]: e.target.validationMessage,
    }));
  };
  
    const classSaveButton = classNames(`register__button`, {
      'register__button_disable': !isValidForm,
      'register__button_disable register__button_error-text': !userAuth,
    });
  
  useEffect(() => {
    if (error.name || error.email || error.password) {
        return setIsValidForm(false);
    } 
    if (!value.password || !value.email || !value.name) {
        return setIsValidForm(false);
    }
    setIsValidForm(true);
  }, [error, value]);
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
                pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
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
              pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
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
        {!userAuth && <span className='register__error'>{authStatusMessage}</span>}
        <button 
          type='submit' 
          className={classSaveButton} 
          onClick={handleSubmit}
          disabled={!isValidForm}
          >Зарегистрироваться</button>
        <p className='register__text'>
          Уже зарегистрированы?
        <Link className='register-link__text' to='/signin'> Войти</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;