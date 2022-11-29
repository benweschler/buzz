import { StyledNavbar, StyledNavItem, StyledNavMenu, StyledHamburger, StyledNavBackground } from "./styles/Navbar.styled";
import { Logo } from "./styles/Navbar.styled";
import {FaBars, FaTimes} from 'react-icons/fa'
import { useState } from "react";

const Navbar = () => {
    const [click, setClick] = useState(false);

    
  
    
    // const handleButton = () => setActive(!active)
    const handleClick = () => setClick(!click);
    
return (
    <StyledNavbar>
        <Logo>Buzz</Logo>
        <StyledNavMenu clicked={click}>
            <StyledNavItem><a href='/'>See What's Buzzin'</a></StyledNavItem>
            {click && <StyledNavItem><a href='/'>QR Scanner</a></StyledNavItem>}
            <StyledNavItem><a href='/'>My Account</a></StyledNavItem>
            <StyledNavItem><a href='/'>Log Out</a></StyledNavItem>
            
        </StyledNavMenu>
        <StyledNavBackground clicked={click}>&nbsp;</StyledNavBackground> 
        <StyledHamburger onClick={handleClick}> 
            {click ? (<FaTimes size={30} style={{color: '#ffd800'}} />) : 
            (<FaBars size={30} style={{color: '#ffd800'}}/>) }
            
            
        </StyledHamburger>
        
        

    </StyledNavbar>
  )
}

export default Navbar