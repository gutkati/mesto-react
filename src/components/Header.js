import React from 'react';
import HeaderLogo from '../images/logo.svg';
//import './Header.css';

function Header() {
    return (
        <header className="header">
            <img src={HeaderLogo} alt="логотип" className="header__logo"/>
            </header>
    )
}
    export default Header;