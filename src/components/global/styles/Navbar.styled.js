import styled from "styled-components";

// const COLORS = {
//     primaryLight: "#ffa700",
//     primaryDark: "#ffdf00"
// };

export const StyledNavbar = styled.div`
  width: 100%;
  height: 60px;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  position: fixed;
  z-index: 700;
  background-color: white;
  
`;

export const Logo = styled.h1`
  margin-right: auto;
  font-family: 'Permanent Marker', cursive;
  /* @media(max-width: ${({ theme }) => theme.mobile}) {
        margin-bottom: 40px;    
    } */
`;

export const StyledNavMenu = styled.ul`
  display: flex;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: fixed;
    top: 0px;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100vh;
    z-index: 800;
    text-align: center;
    scale: ${(props) => (props.clicked ? "100%" : "0")};
    width: ${(props) => (props.clicked ? "100%" : "0")};
    opacity: ${(props) => (props.clicked ? "1" : "0")};
    transition: width 0.3s, opacity 0.8s;
    a:hover {
      color: #708097;
    }
  }
`;
export const StyledNavItem = styled.li`
  padding: 1rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 1.5rem;
    justify-content: center;
    font-size: 1.8rem;
  }
`;

export const StyledHamburger = styled.div`
  display: none;
  z-index: 1000;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
  }
`;

export const StyledNavBackground = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
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

export const StyledNavigation = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 700;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;
