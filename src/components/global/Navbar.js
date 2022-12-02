import {
  StyledNavbar,
  StyledNavItem,
  StyledNavMenu,
  StyledHamburger,
  StyledNavMenuBackground,
  Logo,
} from "./styles/Navbar.styled";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ShowQRButton from "../qr-code/UserQR";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleSignOut = async () => {
    const userID = JSON.parse(localStorage.getItem('user')).id;
    await axios.get(`http://localhost:4000/api/users/signout/${userID}`).catch((error) => {
      console.log(error);
    })

    localStorage.setItem('token', JSON.stringify(""));
    localStorage.setItem('user', JSON.stringify({}));
  }

  return (
    <StyledNavbar>
      <Logo>Buzz</Logo>
      <StyledNavMenu clicked={click}>
        <ShowQRButton/>
        <StyledNavItem>
          <Link to="/feed">See What's Buzzin'</Link>
        </StyledNavItem>
        <StyledNavItem>
          <Link to="/organization-page">Organization</Link>
        </StyledNavItem>
        {click && (
          <StyledNavItem>
            <a href="/event-page">QR Scanner</a>
          </StyledNavItem>
        )}
        <StyledNavItem>
          <Link to="/user-page">My Account</Link>
        </StyledNavItem>
        <StyledNavItem onClick={handleSignOut}>
          <Link to="/log-or-sign-up">Sign Out</Link>
        </StyledNavItem>
        <StyledNavItem>
          <Link to="/create-event">Create Event</Link>
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
