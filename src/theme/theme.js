import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: color 200ms ease-in, background 200ms ease-in;
    
    font-family: 'Monserrat', sans-serif;
    font-size: 1.15em;
    margin: 0;
  }

  .card {
    background: ${({theme}) => theme.card};
    transition: background 200ms ease-in,
    box-shadow 200ms ease-in,
    transform 200ms ease-in;
  }

  
  * {
    box-sizing: border-box;
  }
  p {
    opacity: 0.9;
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: ${({theme}) => theme.text};
    transition: color 100ms ease-in;
  }
  .navLink {
    padding: 0.5rem;
  }
  a:hover {
    color: ${({theme}) => theme.main};
  }
`;

const baseTheme = {
  main: "#FFA700",
  altLighterYellow: "#FFBA00",
  mobile: '768px',
  
}

export const lightTheme = {
  ...baseTheme,
  body: 'rgb(247, 247, 247)',
  text: 'hsl(192, 100%, 9%)',
  card: 'white',
  highlightCard: 'white',
  brightness: 'light',
}

export const darkTheme = {
  ...baseTheme,
  body: 'rgb(21,25,37)',
  text: 'white',
  card: 'rgb(32,37,45)',
  highlightCard: 'rgb(43, 49, 59)',
  brightness: 'dark',
}
