import './Header.css';
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className="header">
        <Link className="header__logo" to="/#" target="_blank"></Link>
        <Navigation />
    </header>
  );
}

export default Header;