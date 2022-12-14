import styled from "styled-components";
import { Link } from "react-router-dom";
import Color from "color";

export const StyledNavbar = styled.div`
  width: 100%;
  height: 60px;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  z-index: 700;
  background-color: ${({theme}) => theme.body};
  transition: background-color 200ms ease-in;
`;

export const LogoLink = styled(Link)`
  margin-right: auto;
`
export const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
`;

export const StyledNavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media (max-width: ${({theme}) => theme.mobile}) {
    position: fixed;
    top: 10%;
    bottom: 10%;
    flex-direction: column;
    justify-content: center;
    height: 80%;
    z-index: 800;
    text-align: center;
    align-items: center;
    scale: ${(props) => (props.clicked ? "100%" : "0")};
    width: ${(props) => (props.clicked ? "100%" : "0")};
    opacity: ${(props) => (props.clicked ? "1" : "0")};
    transition: width 0.3s, opacity 0.8s;
    a:hover {
      color: black;
    }
    
    li {
      position: relative;
      padding: 10px 0;
    }

    a {
      color: black;
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: 0.15em;
      display: inline-block;
      padding: 10px 10px;
      position: relative;
    }

    a::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      display: block;
      height: 2px;
      width: 0;
      background: black;
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
    }

    a:hover::after {
      width: 100%;
      left: 0;
    }
  }
`;

export const NavBarItem = styled.div`
  background: transparent;
  color: ${({theme}) => theme.text};
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 100ms ease-in, border 100ms ease-in, background 100ms ease-in;
  max-width: fit-content;
  max-height: fit-content;
  border: transparent;

  @media (max-width: ${({theme}) => theme.mobile}) {
    margin: 1.5rem;
    justify-content: center;
    font-size: 1.8rem;
  }

  &:hover {
    color: ${({theme}) => theme.main};
    background: ${({theme}) => Color(theme.main).alpha(0.07)};
  }
`;

export const StyledHamburger = styled.div`
  display: none;
  z-index: 1000;
  @media (max-width: ${({theme}) => theme.mobile}) {
    display: flex;
  }
`;

export const StyledNavMenuBackground = styled.div`
  @media (max-width: ${({theme}) => theme.mobile}) {
    position: fixed;
    top: 0.2rem;
    right: 0.2rem;
    background-image: radial-gradient(#ffa700, #ffba00);
    height: 1.5rem;
    width: 1.5rem;
  }
  z-index: 700;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.5s;
`;


