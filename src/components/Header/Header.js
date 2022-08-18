import './Header.css';
import { Link, useLocation } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <header className={splitLocation[1] === "" ? "header header_main-theme" : "header"}>
        <Link className="header__logo" to="/#" target=""></Link>
        <Navigation />
    </header>
  );
}

export default Header;