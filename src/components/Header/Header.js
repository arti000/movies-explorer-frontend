import './Header.css';
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className="header">
        <Link className="header__logo" to="/#" target=""></Link>
        <Navigation />
    </header>
  );
}

export default Header;