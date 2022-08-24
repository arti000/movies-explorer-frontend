import './Profile.css';
import React from "react";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import classNames from 'classnames';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ loggedIn, onSignOut, onClickUpdateProfile, authStatusMessage, userAuth }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [edit, setEdit] = React.useState(false);
  const [userDataUpdate, setUserDataUpdate] = React.useState({ name: '', email: '' });
  const [error, setError] = React.useState({
    name: '',
    email: '',
  });
  const [isValidForm, setIsValidForm] = React.useState(true);
  const buttonClass = classNames(`profile__save-button`, {
    'profile__save-button_disable': !isValidForm,
    'profile__save-button_disable profile__save-button_span-text': !userAuth,
  });

  React.useEffect(() => {
    setUserDataUpdate({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserDataUpdate((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({
      ...prev,
      [name]: e.target.validationMessage,
    }));
  };

  function updateProfile(e) {
    if (error.name && error.email) {
      return;
    }
    e.preventDefault();
    onClickUpdateProfile(userDataUpdate);
  };

  React.useEffect(() => {
    if (error.name || error.email) {
      return setIsValidForm(false);
    } else if (
      currentUser.name === userDataUpdate.name &&
      currentUser.email === userDataUpdate.email
    ) {
      return setIsValidForm(false);
    }
    setIsValidForm(true);
  }, [error, userDataUpdate, currentUser]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <label className='profile__label'>Имя</label>
            <input
              type='text'
              name='name'
              defaultValue={userDataUpdate.name}
              className='profile__input profile__input_type_name'
              placeholder='Имя'
              required
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              minLength={2}
              maxLength={100}
              title='Кириллица'
              disabled={!edit}
              onChange={handleChange}
            />
          </fieldset>
          {error.name && (
            <span className='profile__span-error'>{error.name}</span>
          )}
          <fieldset className='profile__fieldset'>
            <label className='profile__label'>E-mail</label>
            <input
              type='email'
              name='email'
              defaultValue={userDataUpdate.email}
              className='profile__input profile__input_type_email'
              placeholder='email'
              pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
              required
              title='email'
              disabled={!edit}
              onChange={handleChange}
            />
          </fieldset>
          {error.email && (
            <span className='profile__span-error'>{error.email}</span>
          )}
          {!userAuth && <span className='profile__error'>{authStatusMessage}</span>}
          {edit ? (
            <button 
            type='submit'
              className={buttonClass}
              disabled={!isValidForm}
              onClick={updateProfile}
            >
              Сохранить
            </button>
          ) : (
            <div className='profile__buttons'>
              <button type='button' className='profile__edit' onClick={() => setEdit(!edit)}>
                Редактировать
              </button>
              <Link to='/' className='profile__logout' onClick={onSignOut}>
                Выйти из аккаунта
              </Link>
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default Profile;