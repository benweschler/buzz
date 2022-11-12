import React from 'react';
import logo from '../images/BUZZ.png'

function Header() {
    return (
        <header className='Header'>
            <img src={logo} alt="BUZZ logo" height={80} />
            <p style={{fontSize:"40px"}}>{"BUZZ header"}</p>
        </header>
    );
};

export default Header;