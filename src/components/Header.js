import React from 'react';
import HeaderLogo from '../images/logo.svg';

function Header() {
    return (
        <header className="header page__header">
            <img src={HeaderLogo} alt="логотип" className="header__logo"/>
            </header>
    )
}
    export default Header;