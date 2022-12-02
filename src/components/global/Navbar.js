import {
  StyledNavbar,
  StyledNavItem,
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

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleSignOut = async () => {
    const userID = JSON.parse(localStorage.getItem('user')).id;
    await axios.get(`http://localhost:4000/api/users/signout/${userID}`).catch((error) => {
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
        <ShowQRButton/>
        <StyledNavItem>
          <Link to="/feed">See What's Buzzin'</Link>
        </StyledNavItem>
        <StyledNavItem>
          <Link to="/user-page">My Account</Link>
        </StyledNavItem>
        <StyledNavItem onClick={handleSignOut}>
          <Link to="/log-or-sign-up">Sign Out</Link>
        </StyledNavItem>
        <StyledNavItem>
          <Link to="/create-event">Create Event</Link>
        </StyledNavItem>
        <StyledNavItem>
          <Link to="/create-organization">Create Organization</Link>
        </StyledNavItem>
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
