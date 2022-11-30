import {
  StyledNavbar,
  StyledNavItem,
  StyledNavMenu,
  StyledHamburger,
  StyledNavBackground,
  Logo,
} from "./styles/Navbar.styled";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <StyledNavbar>
      <Logo>Buzz</Logo>
      <StyledNavMenu clicked={click}>
        <StyledNavItem>
          <Link to="/organization-page">See What's Buzzin'</Link>
        </StyledNavItem>
        {click && (
          <StyledNavItem>
            <a href="/event-page">QR Scanner</a>
          </StyledNavItem>
        )}
        <StyledNavItem>
          <Link to="/user-page">My Account</Link>
        </StyledNavItem>
        <StyledNavItem>
          <Link to="/login-signin">Log In</Link>
        </StyledNavItem>
      </StyledNavMenu>
      <StyledNavBackground clicked={click}>&nbsp;</StyledNavBackground>
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
