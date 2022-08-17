import './Unauthorized.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Unauthorized() {
  return (
    <nav className='nav'>
      <NavLink to='/signup' className='nav__link'>
        Регистрация
      </NavLink>
      <NavLink to='/signin' className='nav__button'>
        Войти
      </NavLink>
    </nav>
  );
}

export default Unauthorized;