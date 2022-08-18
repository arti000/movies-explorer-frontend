import './Profile.css';
import React from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';

function Profile() {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(true);
  }
  return (
    <>
      <Header />
      <main className='profile'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <label className='profile__label'>Имя</label>
            <input
              type='text'
              name='name'
              defaultValue='Виталий'
              className='profile__input profile__input_type_name'
              placeholder='Имя'
              required
              minLength={2}
              maxLength={100}
              title='Кириллица'
              disabled={!edit}
            />
          </fieldset>
          <fieldset className='profile__fieldset'>
            <label className='profile__label'>E-mail</label>
            <input
              type='email'
              name='email'
              defaultValue='pochta@yandex.ru'
              className='profile__input profile__input_type_email'
              placeholder='email'
              required
              title='email'
              disabled={!edit}
            />
          </fieldset>
          <span className={error ? 'profile__error' : 'profile__error profile__error_inactive' }>
              При обновлении профиля произошла ошибка.
          </span>
          {edit ? (
            <button type='submit' className={error ? 'profile__save-button profile__save-button_disable' : 'profile__save-button' } onClick={handleSubmit}>
              Сохранить
            </button>
          ) : (
            <div className='profile__buttons'>
              <button type='button' className='profile__edit' onClick={() => setEdit(!edit)}>
                Редактировать
              </button>
              <Link to='/' className='profile__logout'>
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