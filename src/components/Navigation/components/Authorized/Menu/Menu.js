import './Menu.css';
import { NavLink } from 'react-router-dom';
import accountLogo from '../../../../../images/account_logo.svg';

function Menu({ onClick }) {
  return (
    <section className='menu'>
      <nav className='menu__nav-menu'>
        <button className='menu__close-icon' onClick={onClick}></button>
        <ul className='menu__nav-list'>
          <li className='menu__nav-list-item'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? 'menu__link menu__link_active'
                  : 'menu__link'
              }
              onClick={onClick}
            >
              Главная
            </NavLink>
          </li>
          <li className='menu__nav-list-item'>
            <NavLink
              to='/movies'
              className={({ isActive }) =>
                isActive
                  ? 'menu__link menu__link_active'
                  : 'menu__link'
              }
              onClick={onClick}
            >
              Фильмы
            </NavLink>
          </li>
          <li className='menu__nav-list-item'>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) =>
                isActive
                  ? 'menu__link menu__link_active'
                  : 'menu__link'
              }
              onClick={onClick}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink
          to='/profile'
          className='menu__link menu__link_profile'>
          Аккаунт
          <img className='menu__account-logo' src={accountLogo} alt='Иконка аккаунта'/>
        </NavLink>
      </nav>
    </section>
  );
}

export default Menu;
