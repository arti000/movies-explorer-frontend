import './Authorized.css';
import React from 'react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Menu from './Menu/Menu';
import accountLogo from '../../../../images/account_logo.svg';
import accountLogoWhite from '../../../../images/account_logo_white.svg';

function Authorized() {
  const [menuOpen, setMenuOpen] = useState(true);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <>
      {menuOpen ? (
        <button 
        className={splitLocation[1] === '' ? 'authorized__hidden-menu authorized__hidden-menu_white' : 'authorized__hidden-menu'}
        onClick={closeMenu}
        >
        </button>
      ) : (
        <Menu onClick={openMenu} />
      )}
      <nav className='authorized__menu'>
        <div className='authorized__movie'>
          <NavLink
            to='/movies'
            className={({isActive}) => isActive ? 'authorized__link authorized__link__active' : 'authorized__link' }
          >
          <p className={splitLocation[1] === '' ? 'authorized__link-text_white' : 'authorized__link-text'}>Фильмы</p>
          </NavLink>
          <NavLink
            to='/saved-movies'
            className={({ isActive }) => isActive ? 'authorized__link authorized__link__active' : 'authorized__link' }
          >
          <p className={splitLocation[1] === '' ? 'authorized__link-text_white' : 'authorized__link-text'}>Сохранённые фильмы</p>
          </NavLink>
        </div>
        <NavLink
          to='/profile'
          className={splitLocation[1] === '' ? "authorized__link_profile_main-theme" : 'authorized__link authorized__link_profile'}>
          <p className={splitLocation[1] === '' ? "authorized__link_text_main-theme" : ''}>
          Аккаунт
          </p>
          <img 
          className={splitLocation[1] === '' ? 'authorized__logo_white' : 'authorized__logo'} 
          src={splitLocation[1] === '' ? accountLogoWhite : accountLogo} 
          alt='Иконка аккаунта'/>
        </NavLink>
      </nav>
    </>
  );
}

export default Authorized;