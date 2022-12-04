import {
  StyledNavbar,
  NavBarItem,
  StyledNavMenu,
  StyledHamburger,
  StyledNavMenuBackground,
  Logo,
  LogoLink,
} from "./styles/Navbar.styled";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShowQRButton from "../qr-code/ShowQRButton";
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import Constants from "../../constants/Constants";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleSignOut = async () => {
    setClick(!click)
    const userID = JSON.parse(localStorage.getItem('user')).id;
    await axios.get(`${Constants.API_ENDPOINT}/api/users/signout/${userID}`).catch((error) => {
      console.log(error);
    })

    localStorage.setItem('user', JSON.stringify({}));
    console.log(secureLocalStorage.getItem('private-key'));
    secureLocalStorage.setItem('private-key', JSON.stringify(""));
  }

  return (
    <StyledNavbar>
      <LogoLink to="/feed">
        <Logo>Buzz</Logo>
      </LogoLink>

      <StyledNavMenu clicked={click}>
        <ShowQRButton className="navLink" />
        <NavBarItem onClick={handleClick}>
          <Link className="navLink" to="/feed">See What's Buzzin'</Link>
        </NavBarItem>
        <NavBarItem onClick={handleClick}>
          <Link className="navLink" to="/user-page">My Account</Link>
        </NavBarItem>
        <NavBarItem onClick={handleSignOut}>
          <Link className="navLink" to="/log-or-sign-up">Sign Out</Link>
        </NavBarItem>
      </StyledNavMenu>
      <StyledNavMenuBackground clicked={click}>&nbsp;</StyledNavMenuBackground>
      <StyledHamburger onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "#ffd800" }} />
        ) : (
          <FaBars size={30} style={{ color: "#ffd800" }} />
        )}
      </StyledHamburger>
    </StyledNavbar>
  );
};

export default Navbar;
