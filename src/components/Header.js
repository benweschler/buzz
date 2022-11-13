import React from 'react';
import logo from '../images/BUZZ.png';
import "./components.css";
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className='Header'>
            <img src={logo} alt="BUZZ logo" height={80} />
            <p style={{fontSize:"40px"}}>{"BUZZ header"}</p>
            <Link to="/login"><button style={{color:'#333'}}>Login</button></Link>
        </header>
    );
};

export default Header;