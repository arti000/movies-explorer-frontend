import './Authorized.css';
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from './Menu/Menu';
import accountLogo from '../../../../images/account_logo.svg';

function Authorized() {
  const [menuOpen, setMenuOpen] = useState(true);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <>
      {menuOpen ? (
        <div className='authorized__hidden-menu' onClick={closeMenu}></div>
      ) : (
        <Menu onClick={openMenu} />
      )}
      <nav className='authorized__menu'>
        <div className='authorized__movie'>
          <NavLink
            to='/movies'
            className={({isActive}) => isActive ? 'authorized__link authorized__link__active' : 'authorized__link' }
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className={({ isActive }) => isActive ? 'authorized__link authorized__link__active' : 'authorized__link' }
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to='/profile'
          className='authorized__link authorized__link_profile'>
          Аккаунт
          <img className='authorized__logo' src={accountLogo} alt='Иконка аккаунта'/>
        </NavLink>
      </nav>
    </>
  );
}

export default Authorized;